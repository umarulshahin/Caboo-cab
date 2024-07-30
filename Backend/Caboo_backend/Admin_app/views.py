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
from Authentication_app.tasks import *
from Authentication_app.views import *



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

        
    users=CustomUser.objects.filter(is_staff=False)
    
    if users:
        
        serializer=UserSerializer(users,many=True)
        return Response(serializer.data)

    return Response({"error":"somting wrong"},status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_Drivers(request):
        
    users = DriverData.objects.all().prefetch_related("customuser")
    print(users)
    if users:
        
        serializer=DriverDataSerializer(users,many=True)
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
        
        try:
            driver = DriverData.objects.get(id=data["id"])
        except CustomUser.DoesNotExist:
            return Response({"error": "Driver not valid"}, status=status.HTTP_404_NOT_FOUND)
        
        if data['status']=='active':
            
            driver.request = data['status']
            driver.save()  
            subject = "Caboo Cab Driver Request Verification"
            message = (
                "Congratulations! Your request has been successfully accepted. "
                "Welcome to our community!"
            )
            
        elif data['status'] == 'decline':
            print(data['status'])
            driver.request = data['status']
            driver.dicline_reason = data ['reason']
            driver.comments = data['comments']
            driver.save()  

            subject = "Caboo Cab Driver Request Verification"
            message = (f"We regret to inform you that your request has been declined. "
            f"The reason provided is: {data['comments']}.")
        
        serializer = DriverDataSerializer(driver, data=request.data, partial=True)
        if serializer.is_valid():
            
            from_email = 'akkushahin666@gmail.com'
            recipient_list = ["akkushahin666@gmail.com"]
            result = send_email_task.delay(subject, message, from_email, recipient_list)
            response = task_status(result.id)
            if response.status_code == 200:
              return Response({"success": f"Status update successfully"}, status=status.HTTP_200_OK)
            return Response({'error': "Email sending failed. Please try again later."})
        
        return Response({'error':serializer.errors})