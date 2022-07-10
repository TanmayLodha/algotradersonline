from django.contrib import admin
from .models import LTP

# Register your models here.


@admin.register(LTP)
class LTPAdmin(admin.ModelAdmin):
    list_display = ['name', 'ltp']
    search_fields = ("name__startswith", )
