from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/driverlocation/(?P<user_id>\w+)/$', consumers.LocationConsumer.as_asgi()),
]