from rest_framework import serializers
from .models import *
from  Authentication_app.models import *
from .models import *
from datetime import datetime


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
        fields=['username', 'email', 'phone', 'profile','id','ride','wallet']
        read_only_fields = ['id']
        
class TripSerializer(serializers.ModelSerializer):
    dataTime = serializers.SerializerMethodField()

    class Meta:
        model = TripDetails
        fields = ['id', 'user', 'driver', 'location', 'destination', 'distance', 'duration', 'amount', 'orderId', 'tripOTP', 'status', 'dataTime', 'payment_type']

    def get_dataTime(self, obj):
        # Format the datetime object to 'YYYY-MM-DD'
        return obj.dataTime.strftime('%Y-%m-%d') if obj.dataTime else None
class OTPValidationSerializer(serializers.Serializer):
    tripOTP = serializers.CharField()
    driver = serializers.IntegerField()

    def validate(self, data):
        tripOTP = data.get('tripOTP')
        driver = data.get('driver')

        if not TripDetails.objects.filter(tripOTP=tripOTP, driver=driver).exists():
            raise serializers.ValidationError("Invalid OTP or driver.")
        
        return data
    
    
class WalletSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserWallet
        fields = ['customuser', 'amount', 'reason', 'status']
