from .scripts import AliceBlue_Get_historical, Breakout_Buy_Sell_Equity
from .serializers import HistoricalSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def histo(request):
    ticker = request.data["ticker"]
    record = AliceBlue_Get_historical.func(ticker)
    serializer_class = HistoricalSerializer(record,many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def strategy(request):
    datas = Breakout_Buy_Sell_Equity.mainfunc()
    print(datas)
    return Response("Executed")


