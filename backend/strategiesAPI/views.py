from .scripts import AliceBlue_Get_historical, simple, Breakout_Buy_Sell_Equity
from .serializers import HistoricalSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import threading


@api_view(['POST'])
def histo(request):
    ticker = request.data["ticker"]
    record = AliceBlue_Get_historical.func(ticker)
    serializer_class = HistoricalSerializer(record,many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def strategy(request):
    t = threading.Thread(target=Breakout_Buy_Sell_Equity.main)
    t.setDaemon(True)
    t.start()
    return Response("Stratey is being executed. Please check your aliceblue portal for any entries.")


