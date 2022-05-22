from django.urls import path
from .views import makeFile,listStrategies,postCred,executeStrategy

urlpatterns = [
    path('api/strategies/', listStrategies, name='strategies'),
    path('api/strategies/<int:pk>', makeFile, name='makeFile'),
    path('api/postCred/', postCred, name='postCredentials'),
    path('api/execute/', executeStrategy, name='executeStrategy'),

]