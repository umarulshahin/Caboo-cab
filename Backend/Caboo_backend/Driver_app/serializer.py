from rest_framework import serializers
from User_app.models import *
from Authentication_app.models import *
from .models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone', 'profile', 'id', 'is_active',]
        read_only_fields = ['id']
class DriverDataSerializer(serializers.ModelSerializer):
    customuser = UserSerializer(read_only=True)

    class Meta:
        model = DriverData
        fields = ['aadhaar',
                  'vehicle_name',
                  'vehicle_no',
                  'rc_img',
                  'license',
                  'insurance',
                  'vehicle_photo',
                  'customuser',
                  'request',
                  'dicline_reason',
                  'comments',
                  'current_Status',
                  'id']

class AllTripSerializer(serializers.ModelSerializer):
    
    dateTime = serializers.SerializerMethodField()
    user =UserSerializer()

    class Meta:
        model = TripDetails
        fields = ['id', 'user', 'driver', 'location', 'destination', 'distance', 'duration', 'amount', 'orderId', 'tripOTP', 'status', 'dateTime', 'payment_type', 'service_type',]

    def get_dateTime(self, obj):
        return obj.dateTime.strftime('%Y-%m-%d') if obj.dateTime else None