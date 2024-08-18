from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import *
from rest_framework import status
from .models import *
from rest_framework.permissions import IsAuthenticated
from  Authentication_app.models import *
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
        
        
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])    
def Image_Upload(request):
    
    if request.method == "PATCH":
        image = request.FILES.get('image')
        id = request.data.get('id')
        
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
    
    user = request.user
    data=CustomUser.objects.filter(email=user)
    serializer=UserSerializer(data,many=True)
           
    return Response(serializer.data)

    
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def ProfilUpdate(request):
    
    user_id=request.data.get('id')
    user=CustomUser.objects.get(id=user_id)
    if user :
        serializer =UserSerializer(user,request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"error":serializer.errors})
        
    return Response({"error":"User data not get"})


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def Ride_management(request):
#     data = request.data
#     # print(data, 'ride management')
    
#     channel_layer = get_channel_layer()
#     message = {
#         'type': 'driver_location',
#         "location": {"latitude": 40.7128, "longitude": -74.0060}
#     }
#     async_to_sync(channel_layer.group_send)(
#         'driver_location_room',  
#         message
#     )
    
#     return Response({'success': "request done"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Ride_management(request):
    data = request.data
    print(data, 'ride management')
    
    try:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'driver_location_room',
            {
                "location":{"latitude": 40.7128, "longitude": -74.0060}
            }
        )
        
        return Response({'success': "request done"})
    except Exception as e:
        print('error',e)
        return Response({"error":'somthing is wrong'},status=500)
   