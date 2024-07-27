from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from User_app.models import *
import random
from django.conf import settings
from celery.result import AsyncResult
from rest_framework.permissions import IsAuthenticated
from .serializer import *
from Driver_app.models import *
from Authentication_app.models import *

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_admin(request):
    
    admin_id = request.GET.get('id', None)
    print(admin_id)
    user=CustomUser.objects.get(id=admin_id)
    if user:
        serializer=UserSerializer(user)
        return Response(serializer.data)

    return Response({"error":"somting wrong"},status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_users(request):

        
    users=CustomUser.objects.filter(is_staff=False,role='user')
         
        

    
    if users:
        
        serializer=UserSerializer(users,many=True)
        return Response(serializer.data)

    return Response({"error":"somting wrong"},status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_Drivers(request):
        
    users = CustomUser.objects.filter(is_staff=False, role='driver').prefetch_related('driver_data_set')
    if users:
        
        serializer=UserSerializer(users,many=True)
        return Response(serializer.data)

    return Response({"error":"somting wrong"},status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def Status_management(request):
        data = request.data
        try:
            user = CustomUser.objects.get(id=data["id"])
        except CustomUser.DoesNotExist:
            return Response({"error": "User not valid"}, status=status.HTTP_404_NOT_FOUND)
        
        if data["action"] == "block":
            user.is_active = False
        else:
            user.is_active = True

        user.save()  

        serializer = UserSerializer(user)
        return Response({"success": f"User {'blocked' if data['action'] == 'block' else 'unblocked'} successfully", "user": serializer.data}, status=status.HTTP_200_OK)
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def Driver_management(request):
    
        data = request.data
        print(data)
        try:
            user = CustomUser.objects.get(id=data["id"])
        except CustomUser.DoesNotExist:
            return Response({"error": "Driver not valid"}, status=status.HTTP_404_NOT_FOUND)
        
        if user.is_active:
            user.is_active = False
            print("block working")

        else:
            user.is_active = True
            print("active working")


        user.save()  

        serializer = UserSerializer(user)
    
        return Response({"success": f"Status update successfully"}, status=status.HTTP_200_OK)