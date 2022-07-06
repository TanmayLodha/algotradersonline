from django.urls import path
from .views import option_data


urlpatterns = [
    path('api/options_data/', option_data, name='option_data'),
]
