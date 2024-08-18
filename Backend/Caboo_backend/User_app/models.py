from django.db import models
from Authentication_app.models import *
import random
import string
from django.utils import timezone


class DriverLocation(models.Model):
    driver_id = models.IntegerField()
    location = models.CharField(max_length=250)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('driver_id', 'timestamp')

class TripDetails(models.Model):
    
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='Trip_user')
    driver = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='Trip_driver')
    location = models.CharField(max_length=250,blank=False)
    destination = models.CharField(max_length=250,blank=False)
    distance = models.CharField(max_length=10,blank=False)
    duration = models.CharField(max_length=10,blank=False)
    amount = models.IntegerField(blank=False)
    orderId = models.CharField(max_length=12, unique=True, blank=True)
    tripOTP = models.CharField(max_length=10,blank=False)
    status = models.CharField(max_length=20,blank=False)
    dataTime = models.DateTimeField(default=timezone.now)
     
    def save(self, *args, **kwargs):
        if not self.orderId:
            self.orderId = self.generate_order_id()
        super().save(*args, **kwargs)

    def generate_order_id(self):

        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
