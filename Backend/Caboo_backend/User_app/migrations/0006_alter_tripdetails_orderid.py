# Generated by Django 5.0.7 on 2024-08-15 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_app', '0005_tripdetails_tripotp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tripdetails',
            name='orderId',
            field=models.CharField(blank=True, max_length=12, unique=True),
        ),
    ]
