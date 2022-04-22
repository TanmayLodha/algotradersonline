from .scripts import AliceBlue_Get_historical, simple, Breakout_Buy_Sell_Equity
from .serializers import HistoricalSerializer, StrategiesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Strategies
from rest_framework import status
import threading


@api_view(['POST'])
def histo(request):
    ticker = request.data["ticker"]
    record = AliceBlue_Get_historical.func(ticker)
    serializer_class = HistoricalSerializer(record,many=True)
    return Response(serializer_class.data)
    pass


@api_view(['GET'])
def executeStrategy(request,pk):
    try:
        detail = Strategies.objects.get(pk=pk)
    except Strategies.DoesNotExist:
        return Response({"error": "Does not Exist"},status=status.HTTP_404_NOT_FOUND)

    serializer = StrategiesSerializer(detail)
    # t = threading.Thread(target=simple.main)
    # t.setDaemon(True)
    # t.start()
    return Response(serializer.data)



@api_view(['GET'])
def listStrategies(request):
    queryset = Strategies.objects.all()
    serializer = StrategiesSerializer(queryset,many=True)
    return Response(serializer.data)





