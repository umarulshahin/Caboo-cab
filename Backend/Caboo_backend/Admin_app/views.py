from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from .models import *
import random
from django.conf import settings
from User_app.tasks import send_email_task
from celery.result import AsyncResult
from rest_framework.permissions import IsAuthenticated
from .serializer import *

@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def Get_admin(request):
    
    
    return Response({"success":"data"})
