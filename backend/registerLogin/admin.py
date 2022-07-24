from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = (
        'username', 'email', 'aliceBlueID', 'isCredential', 'date_joined'
    )


# admin.site.register(CustomUser, CustomUserAdmin)

# Customising Django Admin
admin.site.unregister(Group)
admin.site.site_header = "AlgoTrade Administration"