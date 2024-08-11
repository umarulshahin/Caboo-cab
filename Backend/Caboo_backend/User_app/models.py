from django.db import models


class DriverLocation(models.Model):
    driver_id = models.IntegerField()
    location = models.CharField(max_length=250)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('driver_id', 'timestamp')