from urllib.parse import quote


def placeholder(text, color1, color2):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" style="stop-color:{color1};stop-opacity:1" />
<stop offset="100%" style="stop-color:{color2};stop-opacity:1" />
</linearGradient></defs>
<rect width="400" height="400" fill="url(#g)" rx="12"/>
<text x="200" y="190" text-anchor="middle" font-family="Inter,sans-serif" font-size="18" font-weight="600" fill="white" opacity="0.9">{text}</text>
<text x="200" y="220" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" fill="white" opacity="0.6">ShopVerse</text>
</svg>"""
    return "data:image/svg+xml," + quote(svg)


DEFAULT_PRODUCTS = [
    ("Wireless Noise-Cancelling Headphones", "Electronics", 2999, 5999, 4.5, 1284, "Best Seller", True, "Headphones", "#6C5CE7", "#A29BFE"),
    ("Smart Watch Pro Ultra", "Electronics", 4999, 7999, 4.7, 892, "New Launch", True, "Smart Watch", "#00CEC9", "#55EFC4"),
    ("Portable Bluetooth Speaker", "Electronics", 1499, 2499, 4.3, 2156, "40% Off", True, "Speaker", "#FD79A8", "#FDCB6E"),
    ("4K Ultra HD Webcam", "Electronics", 3499, 4999, 4.4, 567, "", True, "Webcam", "#0984E3", "#74B9FF"),
    ("Premium Leather Jacket", "Fashion", 6999, 12999, 4.8, 423, "Premium", True, "Leather Jacket", "#2D3436", "#636E72"),
    ("Designer Sneakers - Limited Edition", "Fashion", 3499, 5999, 4.6, 1847, "Limited", True, "Sneakers", "#E17055", "#FAB1A0"),
    ("Classic Aviator Sunglasses", "Fashion", 1299, 2499, 4.4, 3421, "48% Off", True, "Sunglasses", "#FDCB6E", "#F39C12"),
    ("Formal Slim-Fit Shirt", "Fashion", 1799, 2999, 4.2, 756, "", True, "Formal Shirt", "#6C5CE7", "#DFE6E9"),
    ("Smart LED Desk Lamp", "Home & Living", 1999, 3499, 4.6, 1123, "Top Rated", True, "Desk Lamp", "#00CEC9", "#81ECEC"),
    ("Bamboo Organizer Set", "Home & Living", 899, 1499, 4.3, 834, "Eco Friendly", True, "Organizer", "#00B894", "#55EFC4"),
    ("Luxury Scented Candle Collection", "Home & Living", 1599, 2499, 4.7, 2098, "", True, "Candles", "#E84393", "#FD79A8"),
    ("Memory Foam Pillow Duo", "Home & Living", 2499, 3999, 4.5, 1456, "38% Off", True, "Pillows", "#74B9FF", "#A29BFE"),
    ("Yoga Mat - Extra Thick", "Sports", 1299, 1999, 4.4, 2467, "", True, "Yoga Mat", "#00CEC9", "#6C5CE7"),
    ("Adjustable Dumbbell Set (2-20 kg)", "Sports", 4499, 6999, 4.8, 678, "Best Value", True, "Dumbbells", "#636E72", "#2D3436"),
    ("Running Shoes - UltraBoost", "Sports", 5499, 8999, 4.6, 3210, "39% Off", True, "Running Shoes", "#E17055", "#FDCB6E"),
    ("Insulated Water Bottle (1L)", "Sports", 799, 1299, 4.5, 4532, "", True, "Water Bottle", "#0984E3", "#00CEC9"),
    ("Complete Skincare Kit", "Beauty", 2999, 4999, 4.7, 1567, "Trending", True, "Skincare Kit", "#FD79A8", "#A29BFE"),
    ("Professional Hair Dryer", "Beauty", 3499, 5499, 4.5, 921, "", True, "Hair Dryer", "#E84393", "#FDCB6E"),
    ("Luxury Perfume - Midnight Bloom", "Beauty", 1999, 3999, 4.6, 2341, "50% Off", True, "Perfume", "#6C5CE7", "#FD79A8"),
    ("Electric Facial Cleansing Brush", "Beauty", 1499, 2499, 4.3, 1876, "", True, "Cleansing Brush", "#00B894", "#55EFC4"),
    ("The Art of Thinking Clearly", "Books", 399, 599, 4.4, 5678, "Bestseller", True, "Thinking Clearly", "#2D3436", "#6C5CE7"),
    ("JavaScript: The Definitive Guide", "Books", 699, 999, 4.7, 3456, "Top Pick", True, "JavaScript Guide", "#0984E3", "#00CEC9"),
    ("Atomic Habits", "Books", 349, 499, 4.9, 12456, "#1 Bestseller", True, "Atomic Habits", "#00B894", "#FDCB6E"),
    ("Design Patterns: Reusable Solutions", "Books", 549, 899, 4.5, 2134, "", False, "Design Patterns", "#E84393", "#A29BFE"),
]


def product_description(title, category):
    return f"{title} from our {category} collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery."


def seed_products(Product):
    if Product.objects.exists():
        return
    Product.objects.bulk_create(
        Product(
            title=title,
            category=category,
            price=price,
            original_price=original_price,
            rating=rating,
            review_count=review_count,
            image=placeholder(image_text, color1, color2),
            description=product_description(title, category),
            badge=badge,
            in_stock=in_stock,
        )
        for title, category, price, original_price, rating, review_count, badge, in_stock, image_text, color1, color2 in DEFAULT_PRODUCTS
    )

