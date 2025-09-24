from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    
    CATEGORY_CHOICES = [
                        ("clothing", "clothing"), 
                        ("shoes", "shoes"),
                        ("accessories", "accessories"), 
                        ("jewelry", "jewelry"),
                        ("watches", "watches"),
                        ]
    
    product_name = models.CharField(max_length=255)
    thumbnail = models.ImageField(blank=True)
    description = models.TextField()
    isAvailable = models.BooleanField(default=True) 
    category = models.CharField(max_length=255 , choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, default=200.00)
   

    def __str__(self):
        return self.product_name
    


class FavoriteItems(models.Model) :
    added_by = models.ForeignKey(User , on_delete=models.CASCADE , null=True)
    product_name = models.CharField(max_length=255)
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE , null=True, unique=True)
    added_on = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.product_name
    

class Cart(models.Model):
    added_by = models.ForeignKey(User, on_delete=models.CASCADE , null=True)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    product_name = models.CharField(max_length=255)
    product_id = models.OneToOneField(Product , unique=True, on_delete=models.CASCADE )
    category = models.CharField(max_length=255)
    quantity = models.IntegerField(default=1)
    current_price = models.DecimalField(max_digits=10, decimal_places=2 , default=0.00)
    old_price = models.DecimalField(max_digits=10 , decimal_places=2 , default=200)
    size = models.CharField(max_length=255 , default="null")