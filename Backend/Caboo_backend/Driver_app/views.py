from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from User_app.models import *
from Authentication_app.models import *
from Driver_app.serializer import *

@api_view(['GET'])
def Driver_Data(request):
    
    data = request.GET.get('id', None)
    try:
        
        user=CustomUser.objects.get(email=data)
        drivar=DriverData.objects.filter(customuser=user.id).prefetch_related('customuser')
    except :
        return Response({"error":"driver data not done "})

    serializer=DriverDataSerializer(drivar,many=True)
    return Response(serializer.data)
     
    
