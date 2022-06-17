from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    aliceBlueID = models.CharField(max_length=20, default=1, unique=True)
    isCredential = models.BooleanField(default=False)
