# Generated by Django 5.0.7 on 2024-10-12 00:52

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_app', '0003_rename_profile_coupons_image'),
        ('User_app', '0020_alter_driverlocation_location'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UsedCoupons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('used_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('Coupon_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Admin_app.coupons')),
                ('User_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
