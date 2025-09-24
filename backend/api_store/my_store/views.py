# from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated, ]
    # authentication_classes = [TokenAuthentication, ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['product_name']


class FavoriteItemsViewset(ModelViewSet):
     queryset = FavoriteItems.objects.all()
     serializer_class = FavoriteItemsSerializers
     authentication_classes = [TokenAuthentication,]
     permission_classes = [IsAuthenticated, ]

     def perform_create(self, serializer):
          serializer.save(added_by = self.request.user)

     def get_queryset(self):
       return self.queryset.filter(added_by=self.request.user)
    



class UserViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileViewset(ModelViewSet):
      queryset = User.objects.all()
      serializer_class = UserSerializer
      authentication_classes = [TokenAuthentication,]
      permission_classes = [IsAuthenticated , ]
      

      def get_queryset(self):
          return self.queryset.filter(id = self.request.user.id)
      



class CartViewset(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated ,]
    authentication_classes = [TokenAuthentication, ]


    def perform_create(self, serializer):
        serializer.save(added_by = self.request.user)

    def get_queryset(self):
        return self.queryset.filter(added_by = self.request.user)
    
    