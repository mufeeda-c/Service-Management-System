from django.urls import path
from .views import registerUser,loginUser

urlpatterns = [
    path('',registerUser ),
    path('login/',loginUser)
]
