from django.contrib.auth.models import User
from rest_framework import serializers

# class RegisterSerializer(serializers.ModelSerializer):
#
#     class AliceBlueSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = AliceBlue
#             fields = '__all__'
#
#     aliceblue_model = AliceBlueSerializer()
#
#     class Meta:
#         model = User
#         fields = ('username','password','email')
#
#         extra_kwargs= {
#             "password":{"write_only":True},
#
#         }
#
#     def create(self,validated_data):
#         aliceBlueData = validated_data.pop('aliceblue_model')
#         username=validated_data.get('username')
#         password = validated_data.get('password')
#         email = validated_data.get('email')
#
#         user =User.objects.create(
#             username =username,
#             password=password,
#             email=email,
#         )
#         return user


class LoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('username', 'password')



