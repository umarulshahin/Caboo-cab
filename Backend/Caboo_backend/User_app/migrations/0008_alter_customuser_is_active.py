# Generated by Django 5.0.7 on 2024-07-20 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_app', '0007_alter_otpstorage_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
