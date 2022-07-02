from .serializers import StrategiesSerializer, CredentialSerializer, PapertradeSerializer, LTPSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Strategies, Papertrade, LTP, TradedStocks
from registerLogin.models import CustomUser
from rest_framework import status
import importlib
import multiprocessing
import datetime

process_list = {}


@api_view(['POST'])
def post_cred(request):
    data = request.data
    serializer = CredentialSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        details = CustomUser.objects.get(username=serializer.data["userName"])
        details.isCredential = True
        details.save(update_fields=['isCredential'])
        return Response({'msg': 'Credentials saved'}, status=status.HTTP_200_OK)

    return Response({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def make_file(request, pk):
    try:
        detail = Strategies.objects.get(pk=pk)
        username = request.data["username"]
        cred = CustomUser.objects.select_related('credentials').get(username=username)

        # Write user config and algotrade_username
        file_object = open(f"strategiesAPI/user_files/{username}.py", "w")
        file_object.write("# config\n"
                          f'username = "{cred.aliceBlueID}"\npassword = "{cred.credentials.password}"\n'
                          f'app_id = "{cred.credentials.api_key}"\napi_secret = "{cred.credentials.api_secret}"\n'
                          f'twoFA = "{cred.credentials.twoFA}"\nalgotrade_username = "{username}"\n\n')
        file_object.close()

        # Append strategy to file
        script_file = open(f"{detail.filePath}", "r")
        script_data = script_file.read()
        file_object = open(f"strategiesAPI/User_files/{username}.py", "a")
        file_object.write(script_data)
        file_object.close()

        return Response({"response": "Unique File Created."}, status=status.HTTP_200_OK)

    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def execute_strategy(request):
    global process_list
    try:
        username = request.data['username']
        file = f"strategiesAPI.user_files.{username}"
        mod = importlib.import_module(file)
        t = multiprocessing.Process(target=mod.main)
        process_list[username] = t
        print(process_list)
        t.start()
        return Response({"response": "Strategy Executed!"}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def stop_strategy(request):
    global process_list
    try:
        username = request.data['username']
        process_list[username].terminate()
        del process_list[username]
        print(process_list)
        return Response({"response": "Strategy Stopped!"}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


# noinspection PyUnusedLocal
@api_view(['GET'])
def list_strategies(request):
    queryset = Strategies.objects.all()
    serializer = StrategiesSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def execute_paper_trade(request):
    global process_list
    try:
        username = request.data['username']
        file = f"strategiesAPI.user_files.{username}"
        mod = importlib.import_module(file)
        t = multiprocessing.Process(target=mod.start_paper_trade)
        process_list[username] = t
        print(process_list)
        t.start()
        return Response({"response": "PaperTrade Executed!"}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_paper_trades(request):
    try:
        username = request.data['username']
        is_completed = request.data['isCompleted']
        is_active = request.data['isActive']
        queryset = Papertrade.objects.all().filter(username=username).filter(isCompleted=is_completed).filter(
            isActive=is_active)
        serializer = PapertradeSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def set_completed(request):
    try:
        username = request.data['username']
        name = request.data['name']
        price = request.data['price']
        signal = request.data['signal']

        # When there are multiple stocks in the list get the one which isn't completed
        queryset = Papertrade.objects.all().filter(username=username).filter(name=name).get(isCompleted=False)
        TradedStocks.objects.all().filter(username=username).filter(stock_name=name).delete()
        queryset.isCompleted = True
        if signal == "BUY":
            queryset.sell_price = price
        else:
            queryset.buy_price = price

        # Time when stock was completed
        queryset.end_time = datetime.datetime.now().time().strftime("%H:%M")
        queryset.save()
        return Response({'response": order completed'}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def set_active(request):
    try:
        username = request.data['username']
        name = request.data['name']

        # When there are multiple stocks in the list get the one which isn't active
        queryset = Papertrade.objects.all().filter(username=username).filter(name=name).get(isActive=False)
        queryset.isActive = True
        queryset.save()
        return Response({'response": order completed'}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def stop_paper_trades(request):
    try:
        username = request.data['username']
        process_list[username].terminate()
        del process_list[username]
        print(process_list)
        Papertrade.objects.all().filter(username=username).delete()
        return Response({"response": "Fields Deleted!"}, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response": "Oops. Your have given a wrong field. "username" expected'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_ltp(request):
    try:
        instrument = request.data['instrument']
        queryset = LTP.objects.none()
        for i in instrument:
            queryset |= LTP.objects.all().filter(name=i)
        serializer = LTPSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except KeyError:
        return Response({'response: Provided Instrument does not exist'},
                        status=status.HTTP_400_BAD_REQUEST)
