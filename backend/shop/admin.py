from django.contrib import admin

from .models import AuthToken, CartItem, Order, OrderItem, Product, Profile, WishlistItem


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "role")
    list_filter = ("role",)
    search_fields = ("user__username", "user__email", "phone")


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "key", "created_at")
    search_fields = ("user__username", "user__email", "key")
    readonly_fields = ("created_at",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "price", "original_price", "rating", "in_stock")
    list_filter = ("category", "in_stock")
    search_fields = ("title", "category", "description")


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity", "updated_at")
    search_fields = ("user__username", "user__email", "product__title")
    readonly_fields = ("created_at", "updated_at")


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "created_at")
    search_fields = ("user__username", "user__email", "product__title")
    readonly_fields = ("created_at",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "title", "category", "price", "quantity")
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "name", "email", "status", "payment_method", "total", "created_at")
    list_filter = ("status", "payment_method", "created_at")
    search_fields = ("order_number", "name", "email", "phone")
    readonly_fields = (
        "order_number",
        "user",
        "subtotal",
        "discount",
        "tax",
        "shipping",
        "total",
        "created_at",
    )
    inlines = (OrderItemInline,)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "title", "category", "price", "quantity")
    search_fields = ("order__order_number", "title", "category")
