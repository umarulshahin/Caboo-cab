from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import *
import random
from .tasks import send_email_task
from django.conf import settings
from celery.result import AsyncResult
from .serializer import *
from rest_framework import status

# Create your views here.

@api_view(['POST'])
def Email_validate(request):
    
     if request.method == "POST":
        data = request.data
        
        # Check if the user already exists
        user=CustomUser.objects.filter(email=data["email"]).exists()
        if user:
            if user.is_active:
                
                result=OTP_sender(data["email"])
                
                if result == "success":
                   return Response({"success": "alredy email exist", "email": data})
                else:
                    return Response({"error": "OTP generation failed, try again later"}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response({"success": "User is not active ", "email": data})
            
        else:
            result=OTP_sender(data["email"])
            if result == "success":
                return Response({"success": "New user", "email": data})
            else:
                return Response({"error": "OTP generation failed, try again later"}, status=status.HTTP_400_BAD_REQUEST)
                    
def OTP_sender(email):
    
    
    otp_code = str(random.randint(100000, 999999))
    subject = "Caboo OTP verification"
    message = f'Your OTP code is {otp_code}. It is valid for 3 minutes.'
    from_email = 'akkushahin666@gmail.com'
    recipient_list = ["akkushahin666@gmail.com"]

        # Send email task (Make sure send_email_task is defined and works properly)
    result = send_email_task.delay(subject, message, from_email, recipient_list)
    response = task_status(result.id)

    if response.status_code == 200:
        
        try:
            
            otp_entry = OtpStorage.objects.get(email=email)
            otp_entry.otp = otp_code
            otp_entry.save()
            
        except OtpStorage.DoesNotExist:
            
            OtpStorage.objects.create(otp=otp_code, email=email)
        return "success"
    
    return  "email sending fail"
        
@api_view(['POST'])
def OTP_validate(request):
    
    if request.method == "POST":
        serializer=OTPverifySerializer(data=request.data)
        
        if serializer.is_valid():
            return Response({"success":"OTP verified successfully"})
        
        return Response({"error":serializer.errors})
        


def task_status(task_id):
    result = AsyncResult(task_id)
    
    if result.ready():
        # Task is complete
        if result.successful():
            return Response({
                'status': 'success',
                'result': result.result  # This is the result returned by the task
            })
        else:

            return Response({
                'status': 'failed',
                'result': str(result.result)  # Error message or traceback
            })
    else:

        return Response({
            'status': 'pending',
            'result': None
        })
        