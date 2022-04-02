from .serializers import  LoginSerializer
from django.contrib.auth.models import User
from rest_framework import generics


class LoginAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer


