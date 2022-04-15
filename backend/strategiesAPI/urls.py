from django.urls import path
from .views import histo, strategy


urlpatterns = [
    path('api/historical/', histo, name='historical'),
    path('api/strategy/', strategy, name='strategy'),

]