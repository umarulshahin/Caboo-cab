from rest_framework import serializers
from User_app.models import *

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=CustomUser
        fields=['username', 'email', 'phone','address', 'profile','id']
        read_only_fields = ['id']
        
   