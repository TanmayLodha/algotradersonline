from rest_framework import serializers
from .models import Strategies

class HistoricalSerializer(serializers.Serializer):
    date = serializers.CharField()
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    close = serializers.FloatField()
    volume = serializers.IntegerField()


class StrategiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Strategies
        fields = ('id','name')