# Generated by Django 4.2.6 on 2024-07-15 14:11

import User_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_app', '0004_alter_customuser_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(max_length=250, upload_to=User_app.models.truncate_filename),
        ),
    ]