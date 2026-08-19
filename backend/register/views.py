from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import registerSerializer,loginSerializer
from django.contrib.auth import authenticate


# Create your views here.
@api_view(['GET'])
def hello(request):
    return Response({"message":"hello drf"})


@api_view(['POST'])
def registerUser(request):
    serializer=registerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message":"user created",
                "data": serializer.data
            }
        )
    return Response(
        {
                     "message":serializer.errors
        }
    )
    
@api_view(['POST'])
def loginUser(request):
    serializer=loginSerializer(data=request.data)
    if serializer.is_valid():
        username=serializer.validated_data['username']
        password=serializer.validated_data['password']
        
        user=authenticate(
            username=username,
            password=password
        )
        if user is not None:
            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role
                }
            })

        return Response(
            {"message": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)