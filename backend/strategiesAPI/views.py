from .serializers import  StrategiesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Strategies
from rest_framework import status
import threading
import shutil
import final


@api_view(['GET'])
def executeStrategy(request, pk):
    try:
        detail = Strategies.objects.get(pk=pk)
    except Strategies.DoesNotExist:
        return Response({"response": "Does not Exist"}, status=status.HTTP_404_NOT_FOUND)

    shutil.copyfile(detail.filePath, "strategiesAPI/final.py")
    t = threading.Thread(target=final.main)
    t.setDaemon(True)
    t.start()
    return Response({"response": "Strategy Executed!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def listStrategies(request):
    queryset = Strategies.objects.all()
    serializer = StrategiesSerializer(queryset, many=True)
    return Response(serializer.data)
