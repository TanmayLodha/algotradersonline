import django
django.setup()
from ..models import Papertrade, TradedStocks
TradedStocks.objects.all().delete()
Papertrade.objects.all().delete()
print(TradedStocks.objects.get(username='an'))