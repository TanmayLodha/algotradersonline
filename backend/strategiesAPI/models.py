from django.db import models
from django.conf import settings
import os
from registerLogin.models import CustomUser


def scripts_path():
    return os.path.join(settings.BASE_DIR, 'strategiesAPI/scripts')


class Strategies(models.Model):
    name = models.CharField(max_length=20)
    filePath = models.FilePathField(path=scripts_path(), unique=True)

    def __str__(self):
        return f"{self.name}"


class Credentials(models.Model):
    userName = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    twoFA = models.CharField(max_length=4)
    password = models.CharField(max_length=50)
    api_key = models.CharField(max_length=100)
    api_secret = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.userName}"


class Papertrade(models.Model):
    username = models.CharField(max_length=100)
    signal = models.CharField(max_length=50)
    name = models.CharField(max_length=50, verbose_name='Stock Name')
    quantity = models.IntegerField()
    buy_price = models.FloatField()
    sell_price = models.FloatField()
    stop_loss = models.FloatField(default=0.0)
    target = models.FloatField(default=0.0)
    isCompleted = models.BooleanField(default=False)
    isActive = models.BooleanField(default=False)
    start_time = models.CharField(max_length=100, default="00:00", verbose_name='Trade Started at')
    end_time = models.CharField(max_length=100, default="00:00", verbose_name='Trade Ended at')

    def __str__(self):
        return f"{self.username} {self.name} {self.isCompleted} {self.isActive}"


class LTP(models.Model):
    name = models.CharField(max_length=100)
    ltp = models.FloatField()

    def __str__(self):
        return f"{self.name} {self.ltp}"


class TradedStocks(models.Model):
    username = models.CharField(max_length=100)
    stock_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.username} {self.stock_name}"
