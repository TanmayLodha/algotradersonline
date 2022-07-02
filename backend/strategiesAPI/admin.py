from django.contrib import admin
from .models import Strategies, Credentials, Papertrade, LTP, TradedStocks


# Register your models here.


@admin.register(Strategies)
class StrategiesAdmin(admin.ModelAdmin):
    list_display = ('name', 'filePath')


@admin.register(Credentials)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ['userName']


@admin.register(Papertrade)
class PaperTradeAdmin(admin.ModelAdmin):
    list_display = ['username', 'name', 'isActive', 'isCompleted']
    search_fields = ("username__startswith",)
    fields = ['username', ('signal', 'name'), ('quantity', 'buy_price', 'sell_price'), ('stop_loss', 'target'),
              ('isActive', 'isCompleted'), ('start_time', 'end_time')]
    list_filter = ("username",)


@admin.register(LTP)
class LTPAdmin(admin.ModelAdmin):
    list_display = ['name', 'ltp']
    search_fields = ("name__startswith",)


@admin.register(TradedStocks)
class TradedStocksAdmin(admin.ModelAdmin):
    list_display = ['username', 'stock_name']
