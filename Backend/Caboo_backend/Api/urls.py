from django.urls import path
from User_app.views import *
from Admin_app.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    
    #*................. Token vlidations...................
    
    path('token/',MyTokenobtainedPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    
    #*.................. User Api .........................
    
    path('signup/',Signup,name='signup'),
    path('emailvalidate/',Email_validate,name='emailvalidate'),
    path('otpverify/',OTP_validate,name='otpverify'),
    path('image_uploade/',Image_Upload,name="image_uploade"),
    path("getuser/",GetUser,name="getuser"),
    path("profilupdate/",ProfilUpdate,name="profilupdate"),
  
  
  #*.....................Admin Api .........................
  
  path('getAdmin/',Get_admin,name="getAdmin"),
  path('getUsers/',Get_users,name="getUsers"),
  path('statusManagement/',Status_management,name="statusManagement")
  
]
