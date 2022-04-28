from rest_framework import serializers
from .models import Strategies


class StrategiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Strategies
        fields = '__all__'
        fields = ('id','name')

