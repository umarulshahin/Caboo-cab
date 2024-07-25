from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import CustomUserSerializer, DriverSerializers
from rest_framework.parsers import MultiPartParser, FormParser
from User_app.models import *
from Authentication_app.models import *

@api_view(["POST"])
def Driver_signup(request):
    data = request.data
    files = request.FILES
    print(data)
    
   
    custom_user_data = {
        'email': data.get('customuser[email]'),
        'username': data.get('customuser[username]'),
        'address': data.get('customuser[address]'),
        'phone': data.get('customuser[phone]'),
        'role': data.get('customuser[role]'),
        'profile': files.get('profile') ,
        'is_active':False 
    }
    
    # Check if CustomUser with provided email exists
    try:
        custom_user = CustomUser.objects.get(email=custom_user_data['email'])
        # Update existing CustomUser
        custom_user_serializer = CustomUserSerializer(custom_user, data=custom_user_data, partial=True)
        if custom_user_serializer.is_valid():
            custom_user_serializer.save()
        else:
            return Response(custom_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        # Create new CustomUser if it doesn't exist
        custom_user_serializer = CustomUserSerializer(data=custom_user_data)
        if custom_user_serializer.is_valid():
            custom_user = custom_user_serializer.save()
        else:
            return Response(custom_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Add customuser id to driver data
    driver_data = {
        'customuser': custom_user.id,
        'aadhaar': data.get('aadhaar'),
        'vehicle_name': data.get('vehicle_name'),
        'vehicle_no': data.get('vehicle_no'),
        'rc_img': files.get('rc_img'),
        'license': files.get('license'),
        'insurance': files.get('insurance'),
        'vehicle_Photo': files.get('vehicle_Photo')
    }

    # Serialize and create Driver_data
    driver_serializer = DriverSerializers(data=driver_data)
    if driver_serializer.is_valid():
        driver_serializer.save()  # Save Driver_data instance
        return Response({"success": "Driver successfully created","data":driver_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
