from rest_framework import serializers
from User_app.models import *

from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(required=False)  # Handle profile photo

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'address', 'phone', 'role', 'profile']


class DriverSerializers(serializers.ModelSerializer):
    customuser = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=True)

    class Meta:
        model = Driver_data
        fields = [
            'customuser', 'aadhaar', 'vehicle_name', 'vehicle_no', 
            'rc_img', 'license', 'insurance', 'vehicle_Photo'
        ]

    def validate(self, attrs):
        # Validation logic
        if Driver_data.objects.filter(aadhaar=attrs.get('aadhaar')).exists():
            raise serializers.ValidationError({"aadhaar": "Aadhaar already exists"})
        if Driver_data.objects.filter(vehicle_no=attrs.get('vehicle_no')).exists():
            raise serializers.ValidationError({"vehicle_no": "Vehicle Number already exists"})
        return attrs

    def create(self, validated_data):
        driver_data = Driver_data.objects.create(
            customuser=validated_data.get('customuser'),
            aadhaar=validated_data.get('aadhaar'),
            vehicle_name=validated_data.get('vehicle_name'),
            vehicle_no=validated_data.get('vehicle_no'),
            rc_img=validated_data.get('rc_img'),
            license=validated_data.get('license'),
            insurance=validated_data.get('insurance'),
            vehicle_Photo=validated_data.get('vehicle_Photo')
        )
        return driver_data
