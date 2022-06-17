from django.contrib import admin
from .models import Strategies, Credentials, Papertrade


# Register your models here.


@admin.register(Strategies)
class StrategiesAdmin(admin.ModelAdmin):
    list_display = ('name', 'filePath')


@admin.register(Credentials)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ['userName']


@admin.register(Papertrade)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ['username', 'name']
