from .serializers import StrategiesSerializer, CredentialSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Strategies
from registerLogin.models import CustomUser
from rest_framework import status
import threading
import importlib


@api_view(['POST'])
def postCred(request):
    data = request.data
    serializer = CredentialSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        details = CustomUser.objects.get(username=serializer.data["userName"])
        details.isCredential = True
        details.save(update_fields=['isCredential'])
        return Response({'msg': 'saved'})
    return Response({'msg': serializer.errors})


@api_view(['POST'])
def makeFile(request, pk):

    detail = Strategies.objects.get(pk=pk)
    username = request.data["username"]
    cred = CustomUser.objects.select_related('credentials').get(username=username)

    # Write user config
    file_object = open(f"strategiesAPI/user_files/{username}.py", "w")
    file_object.write("# config\n"
                      f'username = "{cred.aliceBlueID}"\npassword = "{cred.credentials.password}"\n'
                      f'app_id = "{cred.credentials.api_key}"\napi_secret = "{cred.credentials.api_secret}"\n'
                      f'twoFA = "{cred.credentials.twoFA}"\n\n')
    file_object.close()

    # Append Script data
    script_file = open(f"{detail.filePath}", "r")
    script_data = script_file.read()
    file_object = open(f"strategiesAPI/user_files/{username}.py", "a")
    file_object.write(script_data)
    file_object.close()

    return Response({"response": "Unique File Created."}, status=status.HTTP_200_OK)


@api_view(['POST'])
def executeStrategy(request):
    username = request.data['username']
    file = f"strategiesAPI.User_files.{username}"
    mod = importlib.import_module(file)
    t = threading.Thread(target=mod.main, daemon=True)
    t.start()
    return Response({"response": "Strategy Executed!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def listStrategies(request):
    queryset = Strategies.objects.all()
    serializer = StrategiesSerializer(queryset, many=True)
    return Response(serializer.data)



