from django.urls import path
from .views import option_data, get_ltp


urlpatterns = [
    path('api/options_data/', option_data, name='option_data'),
    path('api/get_ltp/', get_ltp, name='get_ltp'),
]
