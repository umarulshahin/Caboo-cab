from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import *
from rest_framework import status
from .models import *
from rest_framework.permissions import IsAuthenticated
from  Authentication_app.models import *

        
        
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])    
def Image_Upload(request):
    
    if request.method == "PATCH":
        image = request.FILES.get('image')
        id = request.data.get('id')

        print(id)

        
        if not image:
            return Response({"error": "Image file is required"}, status=400)
        data = {"image": image, "id": id}

        serializer = ImageUploadSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"Success": "Image uploaded successfully"}, status=200)
        return Response({"error": serializer.errors}, status=400)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])    
def GetUser(request):
    print("yes it is working")
    user = request.user
    data=CustomUser.objects.filter(email=user)
    serializer=UserSerializer(data,many=True)
           
    return Response(serializer.data)

    
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def ProfilUpdate(request):
    
    user_id=request.data.get('id')
    user=CustomUser.objects.get(id=user_id)
    print(user,'user')
    if user :
        serializer =UserSerializer(user,request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"error":serializer.errors})
        
    return Response({"error":"User data not get"})