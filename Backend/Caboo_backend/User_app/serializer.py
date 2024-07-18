from rest_framework import serializers
from .models import *

class SignupSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'address', 'phone', 'profile', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def create(self, validated_data):
        
        print(validated_data,"validate_data")
        
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            profile=validated_data['profile'],
            password=validated_data['password']
        )
        user.save()
        return user
