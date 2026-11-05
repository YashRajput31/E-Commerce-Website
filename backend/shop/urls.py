from django.urls import path

from . import views


urlpatterns = [
    path("auth/signup/", views.signup),
    path("auth/login/", views.login),
    path("auth/me/", views.me),
    path("auth/logout/", views.logout),
    path("products/", views.products),
    path("products/<int:product_id>/", views.product_detail),
    path("cart/", views.cart),
    path("cart/<int:product_id>/", views.cart_item),
    path("wishlist/", views.wishlist),
    path("orders/", views.orders),
]
