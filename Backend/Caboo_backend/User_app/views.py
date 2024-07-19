from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import SignupSerializer
from rest_framework import status
from .models import *
import random
from django.core.mail import send_mail
from django.conf import settings
from .tasks import send_email_task
from celery.result import AsyncResult


@api_view(['POST'])
def Email_validate(request):
    
    data=request.data
    
    if CustomUser.objects.filter(email=data["email"]).exists():
        
        return Response({"message":"alredy email exist","email":data})
    else:
        
        otp_code = str(random.randint(100000,999999))
        subject="Caboo OTP verification"
        message=f'Your OTP code is {otp_code}. It is valid for 3 minutes.'
        from_email='akkushahin666@gmail.com'
        recipient_list=['akkushahin666@gmail.com']
        
        result = send_email_task.delay(subject, message,from_email,recipient_list)
        response=task_status(result.id)
        print(response,"response")
        print(result.id,"yes work")
        # result=AsyncResult(task_id)
        # if result.ready():
        #     print(result.status)
        #     print(result.result)
        # else:
        #     print(result.status,"else case")
            
    return Response({'success':result.id})
    
@api_view(['POST'])
def Signup(request):
    
    if request.method == "POST":
        try:
            data = request.data 

            if CustomUser.objects.filter(email=data['email']).exists():
                return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            if CustomUser.objects.filter(phone=data['phone']).exists():
                return Response({"error": "phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)
            otp_code=Otp_genaration(data['email'])
            print(otp_code,"otp_code")   
            
            if not otp_code:
                return Response({"error": "OTP genaration faild , try after sometime"}, status=status.HTTP_400_BAD_REQUEST)
                
            # serializer = SignupSerializer(data=data)
            
            # if serializer.is_valid():
            #     serializer.save()
            
            return Response({"otp": otp_code, "user_data":data})
        
        except Exception as e:
            print(f"Error processing request: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def Otp_genaration(email):
    
    try:
                otp_code = str(random.randint(100000,999999))
                print(email)
                send_mail(
                    "Caboo OTP verification",
                    f'Your OTP code is {otp_code}. It is valid for 3 minutes.',
                    'akkushahin666@gmail.com',
                    ['akkushahin666@gmail.com'],
                    fail_silently=False,
                )
                
                return otp_code
            
    except Exception as e:
        
        return "otp faild"
   

def task_status(task_id):
    result = AsyncResult(task_id)
    
    if result.ready():
        # Task is complete
        if result.successful():
            print("yes workin 1")
            return Response({
                'status': 'success',
                'result': result.result  # This is the result returned by the task
            })
        else:
            # Task failed
            print("yes workin 2")

            return Response({
                'status': 'failed',
                'result': str(result.result)  # Error message or traceback
            })
    else:
        # Task is still running
        print("yes workin 3")

        return Response({
            'status': 'pending',
            'result': None
        })