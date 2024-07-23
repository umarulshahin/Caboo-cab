from django.db import models
from django.utils import timezone
import os
from User_app.models import *
# Create your models here.

def truncate_filename(instance, filename):

    filename_base, filename_ext = os.path.splitext(filename)
    truncated_filename = filename_base[:100] + filename_ext
    return os.path.join('img', 'vehicle', truncated_filename)

class Driver_data(models.Model):
    
    customuser = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    aadhaar=models.CharField(max_length=15,blank=False,unique=True)
    vehicle_name=models.CharField(max_length=100,blank=False)
    vehicle_no=models.CharField(max_length=15,blank=False)
    rc_img = models.ImageField(upload_to=truncate_filename, blank=False, max_length=250)
    license = models.ImageField(upload_to=truncate_filename, blank=False, max_length=250)
    insurance = models.ImageField(upload_to=truncate_filename, blank=False, max_length=250)
    vehicle_Photo = models.ImageField(upload_to=truncate_filename, blank=False, max_length=250)



    
    