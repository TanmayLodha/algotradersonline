from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('registerLogin.urls')),
    path('', include('strategiesAPI.urls')),
    path('', include('optionchain.urls')),
]
