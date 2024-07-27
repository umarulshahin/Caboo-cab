from rest_framework import serializers
from Driver_app.models import *
from User_app.models import *
from Authentication_app.models import *


class DriverDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverData
        fields = ['aadhaar', 'vehicle_name', 'vehicle_no', 'rc_img', 'license', 'insurance', 'vehicle_Photo']

class UserSerializer(serializers.ModelSerializer):
    driver_data_set = DriverDataSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone', 'profile', 'id', 'is_active', 'driver_data_set']
        read_only_fields = ['id']