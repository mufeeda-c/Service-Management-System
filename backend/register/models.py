from decimal import Decimal

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
    online_status = models.BooleanField(default=True)
    phone = models.CharField(max_length=10, blank=False)
    email=models.EmailField(unique=True)
    address=models.TextField(blank=True)
    city=models.CharField(max_length=50,blank=True)
    pincode=models.CharField(max_length=6,blank=True)
    photo=models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    experience = models.PositiveIntegerField(blank=True, null=True)
    about=models.TextField(blank=True, null=True)
    
    

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
    inprogress_date=models.DateTimeField(blank=True,null=True)
    completed_date=models.DateTimeField(blank=True,null=True)
    assigned_date=models.DateTimeField(blank=True,null=True)
    cancelled_date=models.DateTimeField(blank=True,null=True)
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
        
class RejectedService(models.Model):
    service = models.ForeignKey(
        ServiceModel,
        on_delete=models.CASCADE,
        related_name='rejected_technicians'
    )
    technician = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='rejected_services'
    )
    rejected_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('service', 'technician')

    def __str__(self):
        return f"{self.technician.username} rejected {self.service.id}"
    
class Bill(models.Model):
    service = models.OneToOneField(
        "ServiceModel",
        on_delete=models.PROTECT,
        related_name="bill"
    )

    technician = models.ForeignKey(
        CustomUser,
        on_delete=models.PROTECT,
        related_name="created_bills"
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Bill #{self.pk} - Service #{self.service_id}"


class BillItem(models.Model):
    bill = models.ForeignKey(
        Bill,
        on_delete=models.CASCADE,
        related_name="items"
    )

    description = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def save(self, *args, **kwargs):
        self.subtotal = Decimal(self.quantity) * self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return self.description
