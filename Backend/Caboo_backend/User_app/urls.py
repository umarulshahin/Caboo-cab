
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/',Signup,name='signup'),
    path('emailvalidate/',Email_validate,name='emailvalidate'),
]
