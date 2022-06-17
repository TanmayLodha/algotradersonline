from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = (
        'username', 'email', 'aliceBlueID', 'isCredential'
    )


admin.site.register(CustomUser, CustomUserAdmin)
