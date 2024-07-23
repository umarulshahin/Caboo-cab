
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import os

def truncate_filename(instance, filename):

    filename_base, filename_ext = os.path.splitext(filename)
    truncated_filename = filename_base[:100] + filename_ext
    return os.path.join('img', 'profile', truncated_filename)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True,blank=False)
    username= models.CharField(max_length=30, blank=False)
    address= models.CharField(max_length=150,blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    phone=models.CharField(max_length=10,blank=False,unique=True)
    profile = models.ImageField(upload_to=truncate_filename, blank=False, max_length=250)
    role= models.CharField(max_length=50,blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

class OtpStorage(models.Model):
    otp=models.CharField(max_length=10,blank=False)
    email=models.EmailField(unique=True,blank=False)