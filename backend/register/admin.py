from django.contrib import admin
from .models import CustomUser,ServiceModel

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ServiceModel)