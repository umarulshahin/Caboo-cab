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
import razorpay
from django.conf import settings        
from django.db.models import *
        
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



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Ride_management(request):
    
    data = request.data
    print(data, 'ride management')
    
    try:
        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     'driver_location_room',
        #     {
        #         "location":{"latitude": 40.7128, "longitude": -74.0060}
        #     }
        # )
        
        return Response({'success': "request done"})
    except Exception as e:
        print('error',e)
        return Response({"error":'somthing is wrong'},status=500)
   
@api_view(['POST'])
@permission_classes([IsAuthenticated])   
def Payment(request):
    
    try:
      data=request.data
      amount = data
      print(amount,'amount')
      if int(amount) >0:
            key_id='rzp_test_CBJeWuVVebxglq'
            secret_key ='NTEfgFjJ4z9dxx4H5fOL1nlm'
            print(key_id,'key id ')
            print(secret_key,'secret key ')
            client = razorpay.Client(auth=(key_id, secret_key))

            payment = client.order.create({"amount": int(amount) * 100, 
                                        "currency": "INR", 
                                        "payment_capture": "1"})
            print(payment,'payment ')
            return Response(payment)
      return Response({"error": "The minimum amount must be at least ₹1."},status=status.HTTP_400_BAD_REQUEST)
     
    except Exception as e:
        return Response ({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
      
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def PaymentSuccess(request):
    
    try:
        print(request.data,'payment success data')
        user_id = request.data['user'][0]['id']
        amount = request.data['amount']
        if user_id:
            user=CustomUser.objects.get(id=user_id)
            if user:
                data={
                    "customuser":user.id,
                    "amount":int(amount),
                    "reason":"Wallet recharge",
                    "status":"add"
                }
                print(data,'data creation')
                serialize = WalletSerializer(data=data)
                if serialize.is_valid():
                    serialize.save()
                    total = int(user.wallet) + int(amount)
                    
                    userserializer = UserSerializer(user,{'wallet':total},partial=True)
                    if userserializer.is_valid():
                        userserializer.save()
                    
                        return Response({"success":serialize.data})
                    return Response({'error':userserializer.errors})
                return Response({'error':serialize.errors})
            return Response({'error':"user not available"},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"error from payment success {e}")
        return Response({"error":str(e)})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Ridedetails(request):
    user_id = request.GET.get('id')  
    
    trips=TripDetails.objects.filter(user=user_id).order_by('-id')
    if trips:
        serializer =TripSerializer(trips,many=True)
        return Response(serializer.data)
    
    return Response("error")