from django.urls import path
from .views import executeStrategy,listStrategies

urlpatterns = [
    path('api/strategies/', listStrategies, name='strategies'),
    path('api/strategies/<int:pk>', executeStrategy, name='executeStrategy'),
]