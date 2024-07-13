from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import SignupSerializer

# Create your views here.

@api_view(['POST'])
def Signup(request):
    
    if request.method == "POST":
        data=request.data.get('signup_data')
        print(data)
        serializer=SignupSerializer(data,)
        if serializer.is_valid():
            pass
            
        
    return Response({"message": "Signup successful"})
