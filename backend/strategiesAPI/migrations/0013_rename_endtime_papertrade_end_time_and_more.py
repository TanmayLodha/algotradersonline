# Generated by Django 4.0.4 on 2022-07-02 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('strategiesAPI', '0012_tradedstocks_rename_time_papertrade_endtime_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='papertrade',
            old_name='endtime',
            new_name='end_time',
        ),
        migrations.RenameField(
            model_name='papertrade',
            old_name='starttime',
            new_name='start_time',
        ),
    ]