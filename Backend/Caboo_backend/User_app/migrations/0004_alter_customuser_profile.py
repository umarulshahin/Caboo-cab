# Generated by Django 4.2.6 on 2024-07-15 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_app', '0003_alter_customuser_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(upload_to='img/profile'),
        ),
    ]