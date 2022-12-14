# Generated by Django 4.0.4 on 2022-05-20 23:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Strategies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('filePath', models.FilePathField(path='/home/vmadmin/Desktop/algoTrade-main/backend/strategiesAPI/scripts', unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Credentials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('twoFA', models.CharField(max_length=4)),
                ('password', models.CharField(max_length=50)),
                ('api_key', models.CharField(max_length=100)),
                ('api_secret', models.CharField(max_length=500)),
                ('userName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
