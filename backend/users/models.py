from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class AliceBlue(models.Model):
    aliceId = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    aliceblueId = models.CharField(max_length=50, verbose_name="AliceBlue id", unique=True)

    class Meta:
        db_table = "Alice Blue"


