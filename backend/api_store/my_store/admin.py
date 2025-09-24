from django.contrib import admin
from .models import *


# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["product_name", "category", "added_on"]
    search_fields = ["product_name", "category"]
    ordering = ["-added_on"]


@admin.register(FavoriteItems)
class FavoriteItemsAdmin(admin.ModelAdmin):
    list_display = ["product_name", "added_by"]
    search_fields = ["product_name"]
    ordering = ["-added_on"]


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["product_name", "added_on" , "old_price"]
    search_fields = ["product_name" , "category"]
    ordering = ["-added_on"]
    