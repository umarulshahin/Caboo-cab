# Generated by Django 5.0.7 on 2024-09-30 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication_app', '0010_alter_driverdata_vehicle_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(blank=True, upload_to='img/profile'),
        ),
    ]
