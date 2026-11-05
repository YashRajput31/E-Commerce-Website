import json
import secrets
from datetime import datetime

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import AuthToken, CartItem, Order, OrderItem, Product, Profile, WishlistItem
from .seed import seed_products


COUPONS = {
    "SAVE10": {"discount": 10, "type": "percent", "label": "10% off"},
    "FLAT200": {"discount": 200, "type": "flat", "label": "Rs.200 off"},
    "WELCOME": {"discount": 15, "type": "percent", "label": "15% off (Welcome)"},
}

DEFAULT_AUTH_OTP = "111111"


def parse_body(request):
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def error(message, status=400):
    return JsonResponse({"detail": message}, status=status)


def validate_otp(data):
    otp = str(data.get("otp") or "").strip()
    return otp == DEFAULT_AUTH_OTP


def user_payload(user):
    profile, _ = Profile.objects.get_or_create(user=user)
    return {
        "id": user.id,
        "name": user.get_full_name() or user.username,
        "email": user.email,
        "phone": profile.phone,
        "role": profile.role,
    }


def product_payload(product):
    return {
        "id": product.id,
        "title": product.title,
        "category": product.category,
        "price": product.price,
        "originalPrice": product.original_price,
        "rating": float(product.rating),
        "reviewCount": product.review_count,
        "image": product.image,
        "description": product.description,
        "badge": product.badge or None,
        "inStock": product.in_stock,
    }


def cart_item_payload(item):
    data = product_payload(item.product)
    data["quantity"] = item.quantity
    return data


def cart_payload(user, coupon_code=None):
    items = list(CartItem.objects.select_related("product").filter(user=user))
    return {"items": [cart_item_payload(i) for i in items], **totals_for_items(items, coupon_code)}


def get_auth_user(request):
    header = request.headers.get("Authorization", "")
    if not header.startswith("Token "):
        return None
    token = header.removeprefix("Token ").strip()
    found = AuthToken.objects.select_related("user").filter(key=token).first()
    return found.user if found else None


def require_user(request):
    user = get_auth_user(request)
    if not user:
        return None, error("Authentication required", 401)
    return user, None


def require_admin(request):
    user, auth_error = require_user(request)
    if auth_error:
        return None, auth_error
    profile, _ = Profile.objects.get_or_create(user=user)
    if profile.role != Profile.ROLE_ADMIN:
        return None, error("Admin access required", 403)
    return user, None


def totals_for_items(items, coupon_code=None):
    subtotal = sum(item.product.price * item.quantity for item in items)
    coupon = COUPONS.get((coupon_code or "").upper())
    discount = 0
    if coupon:
        discount = round(subtotal * coupon["discount"] / 100) if coupon["type"] == "percent" else coupon["discount"]
    after_discount = max(subtotal - discount, 0)
    tax = round(after_discount * 0.18)
    shipping = 0 if subtotal > 999 or subtotal == 0 else 99
    total = after_discount + tax + shipping
    savings = sum(max((item.product.original_price or item.product.price) - item.product.price, 0) * item.quantity for item in items)
    return {
        "subtotal": subtotal,
        "discount": discount,
        "tax": tax,
        "shipping": shipping,
        "total": total,
        "savings": savings,
        "totalItems": sum(item.quantity for item in items),
        "appliedCoupon": {"code": coupon_code.upper(), **coupon} if coupon else None,
    }


@csrf_exempt
def signup(request):
    if request.method != "POST":
        return error("Method not allowed", 405)
    data = parse_body(request)
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    if not email or not password or not name:
        return error("Name, email, and password are required")
    if not validate_otp(data):
        return error("Invalid OTP. Use 111111 for verification.", 401)

    User = get_user_model()
    if User.objects.filter(email=email).exists() or User.objects.filter(username=email).exists():
        return error("Email already registered")

    user = User.objects.create(username=email, email=email, password=make_password(password), first_name=name)
    Profile.objects.create(user=user, phone=phone, role=Profile.ROLE_USER)
    token = AuthToken.objects.create(user=user, key=secrets.token_hex(32))
    return JsonResponse({"user": user_payload(user), "token": token.key}, status=201)


@csrf_exempt
def login(request):
    if request.method != "POST":
        return error("Method not allowed", 405)
    ensure_admin_user()
    data = parse_body(request)
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not validate_otp(data):
        return error("Invalid OTP. Use 111111 for verification.", 401)
    user = authenticate(username=email, password=password)
    if not user:
        return error("Invalid email or password", 401)
    token = AuthToken.objects.create(user=user, key=secrets.token_hex(32))
    return JsonResponse({"user": user_payload(user), "token": token.key})


@csrf_exempt
def me(request):
    if request.method != "GET":
        return error("Method not allowed", 405)
    user, auth_error = require_user(request)
    if auth_error:
        return auth_error
    return JsonResponse({"user": user_payload(user)})


@csrf_exempt
def logout(request):
    if request.method != "POST":
        return error("Method not allowed", 405)
    header = request.headers.get("Authorization", "")
    if header.startswith("Token "):
        AuthToken.objects.filter(key=header.removeprefix("Token ").strip()).delete()
    return JsonResponse({"ok": True})


def ensure_admin_user():
    User = get_user_model()
    user, created = User.objects.get_or_create(username="admin@shopverse.com", defaults={"email": "admin@shopverse.com", "first_name": "Admin"})
    if created or not user.check_password("admin123"):
        user.password = make_password("admin123")
        user.email = "admin@shopverse.com"
        user.first_name = "Admin"
        user.save()
    profile, _ = Profile.objects.get_or_create(user=user)
    profile.role = Profile.ROLE_ADMIN
    profile.phone = profile.phone or "9999999999"
    profile.save()


@csrf_exempt
def products(request):
    seed_products(Product)
    if request.method == "GET":
        return JsonResponse({"products": [product_payload(p) for p in Product.objects.all()]})
    if request.method == "POST":
        _, auth_error = require_admin(request)
        if auth_error:
            return auth_error
        data = parse_body(request)
        product = Product.objects.create(
            title=data.get("title", "").strip(),
            category=data.get("category", "Electronics"),
            price=int(data.get("price") or 0),
            original_price=int(data.get("originalPrice") or data.get("price") or 0),
            rating=float(data.get("rating") or 0),
            review_count=int(data.get("reviewCount") or 0),
            image=data.get("image") or Product.objects.first().image,
            description=data.get("description", ""),
            badge=data.get("badge") or "New",
            in_stock=bool(data.get("inStock", True)),
        )
        return JsonResponse({"product": product_payload(product)}, status=201)
    return error("Method not allowed", 405)


@csrf_exempt
def product_detail(request, product_id):
    seed_products(Product)
    product = Product.objects.filter(id=product_id).first()
    if not product:
        return error("Product not found", 404)
    if request.method == "GET":
        related = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
        return JsonResponse({"product": product_payload(product), "related": [product_payload(p) for p in related]})
    if request.method in ("PUT", "PATCH"):
        _, auth_error = require_admin(request)
        if auth_error:
            return auth_error
        data = parse_body(request)
        for attr, key in (("title", "title"), ("category", "category"), ("description", "description"), ("image", "image"), ("badge", "badge")):
            if key in data:
                setattr(product, attr, data[key] or "")
        if "price" in data:
            product.price = int(data["price"] or 0)
        if "originalPrice" in data:
            product.original_price = int(data["originalPrice"] or product.price)
        if "rating" in data:
            product.rating = float(data["rating"] or 0)
        if "inStock" in data:
            product.in_stock = bool(data["inStock"])
        product.save()
        return JsonResponse({"product": product_payload(product)})
    if request.method == "DELETE":
        _, auth_error = require_admin(request)
        if auth_error:
            return auth_error
        product.delete()
        return JsonResponse({"ok": True})
    return error("Method not allowed", 405)


@csrf_exempt
def cart(request):
    user, auth_error = require_user(request)
    if auth_error:
        return auth_error
    if request.method == "GET":
        coupon_code = request.GET.get("coupon")
        return JsonResponse(cart_payload(user, coupon_code))
    if request.method == "POST":
        data = parse_body(request)
        product = Product.objects.filter(id=data.get("productId")).first()
        if not product:
            return error("Product not found", 404)
        item, created = CartItem.objects.get_or_create(user=user, product=product, defaults={"quantity": 0})
        item.quantity += int(data.get("quantity") or 1)
        item.save()
        return JsonResponse(cart_payload(user))
    if request.method == "DELETE":
        CartItem.objects.filter(user=user).delete()
        return JsonResponse({"items": [], **totals_for_items([])})
    return error("Method not allowed", 405)


@csrf_exempt
def cart_item(request, product_id):
    user, auth_error = require_user(request)
    if auth_error:
        return auth_error
    item = CartItem.objects.filter(user=user, product_id=product_id).first()
    if request.method in ("PUT", "PATCH"):
        data = parse_body(request)
        quantity = int(data.get("quantity") or 0)
        if quantity <= 0:
            CartItem.objects.filter(user=user, product_id=product_id).delete()
        elif item:
            item.quantity = quantity
            item.save()
        return JsonResponse(cart_payload(user))
    if request.method == "DELETE":
        CartItem.objects.filter(user=user, product_id=product_id).delete()
        return JsonResponse(cart_payload(user))
    return error("Method not allowed", 405)


@csrf_exempt
def wishlist(request):
    user, auth_error = require_user(request)
    if auth_error:
        return auth_error
    if request.method == "GET":
        items = WishlistItem.objects.select_related("product").filter(user=user)
        return JsonResponse({"items": [product_payload(i.product) for i in items]})
    if request.method == "POST":
        data = parse_body(request)
        product = Product.objects.filter(id=data.get("productId")).first()
        if not product:
            return error("Product not found", 404)
        item = WishlistItem.objects.filter(user=user, product=product).first()
        added = not item
        if item:
            item.delete()
        else:
            WishlistItem.objects.create(user=user, product=product)
        items = WishlistItem.objects.select_related("product").filter(user=user)
        return JsonResponse({"added": added, "items": [product_payload(i.product) for i in items]})
    return error("Method not allowed", 405)


@csrf_exempt
def orders(request):
    user, auth_error = require_user(request)
    if auth_error:
        return auth_error
    if request.method == "GET":
        return JsonResponse({"orders": [order_payload(o) for o in Order.objects.prefetch_related("items").filter(user=user)]})
    if request.method == "POST":
        data = parse_body(request)
        items = list(CartItem.objects.select_related("product").filter(user=user))
        if not items:
            return error("Cart is empty")
        coupon_code = data.get("couponCode")
        totals = totals_for_items(items, coupon_code)
        shipping_info = data.get("shipping") or {}
        required = ["name", "email", "phone", "address", "city", "state", "pincode"]
        if any(not shipping_info.get(field) for field in required):
            return error("Complete shipping information is required")
        with transaction.atomic():
            order = Order.objects.create(
                user=user,
                order_number=f"ORD-{datetime.now().strftime('%Y%m%d')}-{secrets.token_hex(3).upper()}",
                name=shipping_info["name"],
                email=shipping_info["email"],
                phone=shipping_info["phone"],
                address=shipping_info["address"],
                city=shipping_info["city"],
                state=shipping_info["state"],
                pincode=shipping_info["pincode"],
                payment_method=data.get("paymentMethod", "cod"),
                subtotal=totals["subtotal"],
                discount=totals["discount"],
                tax=totals["tax"],
                shipping=totals["shipping"],
                total=totals["total"],
            )
            OrderItem.objects.bulk_create(
                OrderItem(
                    order=order,
                    product=item.product,
                    title=item.product.title,
                    category=item.product.category,
                    image=item.product.image,
                    price=item.product.price,
                    quantity=item.quantity,
                )
                for item in items
            )
            CartItem.objects.filter(user=user).delete()
        return JsonResponse({"order": order_payload(order)}, status=201)
    return error("Method not allowed", 405)


def order_payload(order):
    return {
        "id": order.order_number,
        "date": order.created_at.date().isoformat(),
        "status": order.status,
        "total": order.total,
        "items": [
            {
                "id": item.product_id,
                "title": item.title,
                "category": item.category,
                "image": item.image,
                "price": item.price,
                "quantity": item.quantity,
            }
            for item in order.items.all()
        ],
    }
