
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('signup/',Signup,name='signup'),
    path('emailvalidate/',Email_validate,name='emailvalidate'),
    path('otpverify/',OTP_validate,name='otpverify'),
    path('token/',MyTokenobtainedPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('image_uploade/',Image_Upload,name="image_uploade"),
    path("getuser/",GetUser,name="getuser"),
    path("profilupdate/",ProfilUpdate,name="profilupdate"),
]
