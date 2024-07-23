from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import *
from rest_framework import status
from .models import *
import random
from django.conf import settings
from .tasks import send_email_task
from celery.result import AsyncResult
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        token["role"]=user.is_superuser

        return token
class MyTokenobtainedPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['POST'])
def Email_validate(request):
    
     if request.method == "POST":
        data = request.data
        
        # Check if the user already exists
        if CustomUser.objects.filter(email=data["email"], role=data["role"]).exists():
            return Response({"success": "alredy email exist", "email": data})
        
        # Generate OTP code
        otp_code = str(random.randint(100000, 999999))
        subject = "Caboo OTP verification"
        message = f'Your OTP code is {otp_code}. It is valid for 3 minutes.'
        from_email = 'akkushahin666@gmail.com'
        recipient_list = ["akkushahin666@gmail.com"]

        # Send email task (Make sure send_email_task is defined and works properly)
        result = send_email_task.delay(subject, message, from_email, recipient_list)
        response = task_status(result.id)

        if response.status_code == 200:
            # Handle OTP storage
            try:
                otp_entry = OtpStorage.objects.get(email=data['email'])
                otp_entry.otp = otp_code
                otp_entry.save()
            except OtpStorage.DoesNotExist:
                OtpStorage.objects.create(otp=otp_code, email=data['email'])
            
            return Response({'success': "OTP sent", "data": data})
        else:
            return Response({"error": "OTP generation failed, try again later"}, status=status.HTTP_400_BAD_REQUEST)
       
@api_view(['POST'])
def OTP_validate(request):
    
    if request.method == "POST":
        serializer=OTPverifySerializer(data=request.data)
        
        if serializer.is_valid():
            return Response({"success":"OTP verified successfully"})
        
        return Response({"error":serializer.errors})
        
    
@api_view(['POST'])
def Signup(request):
    
    if request.method == "POST":
        
        try:
            
            serializer = SignupSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                
                subject="Welcome Caboo cab"
                message=f'Congratulations! Your account has been successfully created. Welcome to our community!'
                from_email='akkushahin666@gmail.com'
                recipient_list=['akkushahin666@gmail.com']
                send_email_task.delay(subject, message,from_email,recipient_list)
                
                return Response({"success":"success","data":serializer.data,"password":request.data.get('password')})
            return Response({"error":serializer.errors})
            
        except Exception as e:
            print(f"Error processing request: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

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
        
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])    
def Image_Upload(request):
    
    if request.method == "PATCH":
        image = request.FILES.get('image')
        user_email = request.user.email
        
        if not image:
            return Response({"error": "Image file is required"}, status=400)
        data = {"image": image, "user": user_email}

        serializer = ImageUploadSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"Success": "Image uploaded successfully"}, status=200)
        return Response({"error": serializer.errors}, status=400)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])    
def GetUser(request):
    
    user = request.user
    data=CustomUser.objects.filter(email=user)
    serializer=UserSerializer(data,many=True)
           
    return Response(serializer.data)

    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ProfilUpdate(request):
    
    id = request.user.id
    user=CustomUser.objects.get(id=id)
    
    if user :
        serializer =UserSerializer(user,request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"error":serializer.errors})
        
    return Response({"error":"User data not get"})