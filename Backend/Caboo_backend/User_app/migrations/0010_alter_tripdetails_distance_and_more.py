# Generated by Django 5.0.7 on 2024-08-28 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_app', '0009_tripdetails_datatime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tripdetails',
            name='distance',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='tripdetails',
            name='duration',
            field=models.CharField(max_length=50),
        ),
    ]
