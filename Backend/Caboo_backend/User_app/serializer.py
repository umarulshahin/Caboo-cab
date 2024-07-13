from rest_framework import serializers
from .models import *

class SignupSerializer(serializers.Serializer):
    
    class Meta:
        models=CustomUser
        fields = ['email', 'username', 'address', 'phone', 'profile', 'password']
