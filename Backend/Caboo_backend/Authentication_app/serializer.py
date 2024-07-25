from rest_framework import serializers
from .models import *
from  Authentication_app.models import *


class SignupSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'address', 'phone', 'password','role','id']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        
    def validate(self, attrs):
        
            if CustomUser.objects.filter(email=attrs['email'],role=attrs['role']).exists():
                raise serializers.ValidationError({"email": "Email already exists."})
            if CustomUser.objects.filter(phone=attrs['phone'],role=attrs['role']).exists():
                raise serializers.ValidationError({"phone": "Phone number already exists."})
            return attrs
           
    def create(self, validated_data):
                
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        user.save()
        return user


class OTPverifySerializer(serializers.Serializer):
    
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        otp = attrs.get("otp")
        email = attrs.get("email")
        
        if OtpStorage.objects.filter(otp=otp, email=email).exists():
            return attrs
        else:
            raise serializers.ValidationError("OTP is invalid")
        
class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
    user = serializers.EmailField()
    
    def create(self, validated_data):
        user = CustomUser.objects.filter(email=validated_data["user"]).first()
        if user:
            user.profile = validated_data["image"]
            user.save()
            return user
        raise serializers.ValidationError("User not found")
    
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=CustomUser
        fields=['username', 'email', 'phone','address', 'profile','id']
        read_only_fields = ['id']
        
