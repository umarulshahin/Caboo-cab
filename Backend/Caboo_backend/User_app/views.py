from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import *
from rest_framework import status
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from  Authentication_app.models import *
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

# 
        
    
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
   

# def task_status(task_id):
#     result = AsyncResult(task_id)
    
#     if result.ready():
#         # Task is complete
#         if result.successful():
#             print("yes workin 1")
#             return Response({
#                 'status': 'success',
#                 'result': result.result  # This is the result returned by the task
#             })
#         else:
#             # Task failed
#             print("yes workin 2")

#             return Response({
#                 'status': 'failed',
#                 'result': str(result.result)  # Error message or traceback
#             })
#     else:
#         # Task is still running
#         print("yes workin 3")

#         return Response({
#             'status': 'pending',
#             'result': None
#         })
        
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