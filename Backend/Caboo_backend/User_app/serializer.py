from rest_framework import serializers
from .models import *
from  Authentication_app.models import *


class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
    id = serializers.IntegerField()    
    def create(self, validated_data):
        user = CustomUser.objects.filter(id=validated_data["id"]).first()
        if user:
            user.profile = validated_data["image"]
            user.save()
            return user
        raise serializers.ValidationError("User not found")
    
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=CustomUser
        fields=['username', 'email', 'phone', 'profile','id']
        read_only_fields = ['id']
        
class TripSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TripDetails
        fields = ['user', 'driver' , 'location', 'destination', 'distance', 'duration', 'amount', 'orderId','tripOTP', 'status', 'dataTime' ]
        
class OTPValidationSerializer(serializers.Serializer):
    tripOTP = serializers.CharField()
    driver = serializers.IntegerField()

    def validate(self, data):
        tripOTP = data.get('tripOTP')
        driver = data.get('driver')

        if not TripDetails.objects.filter(tripOTP=tripOTP, driver=driver).exists():
            raise serializers.ValidationError("Invalid OTP or driver.")
        
        return data