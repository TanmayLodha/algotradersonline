from django.contrib import admin
from .models import AliceBlue

# Register your models here.


@admin.register(AliceBlue)
class AliceBlueAdmin(admin.ModelAdmin):
    list_display = ("aliceId", "aliceblueId")
