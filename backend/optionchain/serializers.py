from rest_framework import serializers
from .models import LTP


class LTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = LTP
        fields = '__all__'
