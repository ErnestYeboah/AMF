from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("products", ProductViewset, basename="products")
router.register("users", UserViewset, basename="users")
router.register("userprofile", UserProfileViewset, basename="userprofile")
router.register("favorites", FavoriteItemsViewset, basename="favorites")
router.register("cart", CartViewset, basename="cart")

urlpatterns = [
    path('api/', include(router.urls))
]
