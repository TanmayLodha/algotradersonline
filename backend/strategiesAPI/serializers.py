from rest_framework import serializers


class HistoricalSerializer(serializers.Serializer):
    date = serializers.CharField()
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    close = serializers.FloatField()
    volume = serializers.IntegerField()