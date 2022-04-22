from django.db import models
from django.conf import settings
import os

# Create your models here.

def scripts_path():
    return os.path.join(settings.BASE_DIR,'strategiesAPI/scripts')

class Strategies(models.Model):
    name = models.CharField(max_length=20)
    filePath = models.FilePathField(path=scripts_path(),unique=True)

    def __str__(self):
        return self.name
