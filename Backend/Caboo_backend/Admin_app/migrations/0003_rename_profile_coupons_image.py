# Generated by Django 5.0.7 on 2024-10-10 19:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_app', '0002_alter_coupons_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coupons',
            old_name='profile',
            new_name='image',
        ),
    ]
