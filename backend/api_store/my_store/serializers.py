from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class ProductSerializer(serializers.ModelSerializer):
    class Meta :
        model = Product
        fields = '__all__'


class FavoriteItemsSerializers(serializers.ModelSerializer):
    class Meta : 
        model = FavoriteItems
        fields = "__all__"



class CartSerializer(serializers.ModelSerializer):
    class Meta :
        model = Cart
        fields = "__all__"

    

        
    
class UserSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ["id", "username", "email","password"  ]
        read_only_fields = ["id"]
        extra_kwargs = {"password" : {
            "write_only" : True,
            "required" : True
        }}
        
        
    def create(self, validated_data):
       user = User.objects.create_user(**validated_data)
       Token.objects.get_or_create(user=user)
       return user

  



