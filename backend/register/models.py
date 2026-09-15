from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('technician', 'Technician'),
        ('admin', 'Admin'),
    )  
    SKILL_CHOICES = (
        ('Plumbing', 'Plumbing'),
        ('Electrician', 'Electrician'),
        ('Carpentry', 'Carpentry'),
        ('Cleaning', 'Cleaning'),
        ('AC_Repair', 'AC Repair'),
        ('Appliance_Repair', 'Appliance Repair'),
        ('Painting', 'Painting'),
        ('General', 'General'),
    )

    role=models.CharField(choices=ROLE_CHOICES,blank=False)
    skill = models.CharField(
        max_length=30,
        choices=SKILL_CHOICES,
        blank=True,
        null=True
    )
    phone = models.CharField(max_length=10, blank=False)
    email=models.EmailField(unique=True)
    
    

class ServiceModel(models.Model):
    STATUS_CHOICES = (
            ('assigned', 'Assigned'),
            ('completed', 'Completed'),
            ('pending', 'Pending'),
            ('in progress','In progress'),
            ('cancelled', 'Cancelled'),
        )
    CATEGORY_CHOICES = (
            ('Plumbing', 'Plumbing'),
            ('Electrician', 'Electrician'),
            ('Carpentry', 'Carpentry'),
            ('Cleaning', 'Cleaning'),
            ('AC_Repair', 'AC Repair'),
            ('Appliance_Repair', 'Appliance Repair'),
            ('Painting', 'Painting'),
            ('General', 'General'),
        )
    customer=models.ForeignKey(CustomUser,on_delete=models.CASCADE,blank=False)
    description=models.TextField(blank=False)
    status=models.CharField(choices=STATUS_CHOICES,blank=False,max_length=20,default='pending')
    category=models.CharField(choices=CATEGORY_CHOICES,blank=False,max_length=20)
    pincode = models.CharField(max_length=6)
    date=models.DateTimeField(blank=False)
    created_at=models.DateTimeField(auto_now_add=True)
    address=models.TextField(blank=False)
    technician = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_services'
    )
    is_active = models.BooleanField(default=True)
    is_delete = models.BooleanField(default=False)    
    def __str__(self):
            return self.description