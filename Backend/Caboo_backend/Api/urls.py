from django.urls import path
from User_app.views import *
from Admin_app.views import *
from Driver_app.views import *
from Authentication_app.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    
    #*................. Token vlidations...................
        path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
        path('token_view/',Token_view,name='token_view'),
    
    #*.................. User Api .........................
    
    path('signup/',Signup,name='signup'),
    path('emailvalidate/',Email_validate,name='emailvalidate'),
    path('otpverify/',OTP_validate,name='otpverify'),
    path('image_uploade/',Image_Upload,name="image_uploade"),
    path('getuser/',GetUser,name='getuser'),
    path('profilupdate/',ProfilUpdate,name='profilupdate'),
    path('rideManagement/',Ride_management,name='rideManagement'),
  
  
  #*.....................Admin Api .........................
  
  path('getAdmin/',Get_admin,name='getAdmin'),
  path('getUsers/',Get_users,name='getUsers'),
  path('getDriver/',Get_Drivers,name='getDrivers'),
  path('statusManagement/',Status_management,name='statusManagement'),
  path('Drivermanagement/',Driver_management,name="Drivermanagment"),
  
    #*.....................Driver Api .........................
    
  path('driver_signup/',Driver_signup,name="driver_signup"),
  path('driver_data/',Driver_Data,name="driver_data"),
  path('Driverstatus/',Driver_Status,name='Driverstatus')

  
]
