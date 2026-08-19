from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('technician', 'Technician'),
        ('admin', 'Admin'),
    )   
    role=models.CharField(choices=ROLE_CHOICES,blank=False)
    phone = models.CharField(max_length=10, blank=False)
    email=models.EmailField(unique=True)
