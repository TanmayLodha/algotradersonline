from rest_framework import serializers
from .models import Strategies, Credentials, Papertrade
from registerLogin.models import CustomUser


class StrategiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Strategies
        fields = ('id', 'name')


class CredentialSerializer(serializers.ModelSerializer):
    userName = serializers.SlugRelatedField(many=False, read_only=False, slug_field='username',
                                            queryset=CustomUser.objects.all())

    class Meta:
        model = Credentials
        fields = '__all__'


class PapertradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Papertrade
        fields = '__all__'
