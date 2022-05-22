from django.contrib import admin
from .models import Strategies,Credentials


# Register your models here.


@admin.register(Strategies)
class StratergiesAdmin(admin.ModelAdmin):
    list_display = ('name','filePath')


@admin.register(Credentials)
class CredentialAdmin(admin.ModelAdmin):
    list_display = ['userName']

