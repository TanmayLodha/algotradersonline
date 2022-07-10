from django.contrib import admin
from .models import Strategies, Credentials, Papertrade, TradedStocks

# Register your models here.


@admin.register(Strategies)
class StrategiesAdmin(admin.ModelAdmin):
    list_display = ('name', 'filePath')


@admin.register(Credentials)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ['userName']


@admin.register(Papertrade)
class PaperTradeAdmin(admin.ModelAdmin):
    list_display = ['username', 'name', 'isActive', 'isCompleted', 'date']
    search_fields = ("username__startswith", )
    fields = [
        'username', ('signal', 'name'),
        ('quantity', 'buy_price', 'sell_price'), ('stop_loss', 'target'),
        ('isActive', 'isCompleted'), ('start_time', 'end_time', 'date'), ("historical_volume", "current_volume"), 'ltp',
        ('net_pl', 'net_charges')
    ]
    list_filter = ("username", "date" )





@admin.register(TradedStocks)
class TradedStocksAdmin(admin.ModelAdmin):
    list_display = ['username', 'stock_name']
