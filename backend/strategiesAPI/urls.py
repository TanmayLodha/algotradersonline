from django.urls import path
from .views import histo, executeStrategy,listStrategies


urlpatterns = [
    path('api/historical/', histo, name='historical'),
    path('api/strategies/', listStrategies, name='strategies'),
    path('api/strategies/<int:pk>', executeStrategy, name='executeStrategy'),

]