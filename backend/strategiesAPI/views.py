from .serializers import  StrategiesSerializer, CredentialSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Strategies
from rest_framework import status
import threading
import shutil
# import final


@api_view(['GET'])
def executeStrategy(request, pk):

    detail = Strategies.objects.get(pk=pk)
    shutil.copyfile(detail.filePath, "strategiesAPI/final.py")
    # t = threading.Thread(target=final.main)
    # t.setDaemon(True)
    # t.start()
    return Response({"response": "Strategy Executed!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def listStrategies(request):
    queryset = Strategies.objects.all()
    serializer = StrategiesSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postCred(request):
    data = request.data
    serializer = CredentialSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'msg': 'saved'})
    return Response({'msg':serializer.errors})
