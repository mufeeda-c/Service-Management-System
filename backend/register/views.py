from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator 

from .serializers import registerSerializer,loginSerializer,bookServiceSerializer
from django.contrib.auth import authenticate,login,logout
from .models import ServiceModel
from .models import CustomUser


# Create your views here.

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrfToken(request):
    return Response({"message": "CSRF cookie set"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hello(request):
    print(request.user)
    return Response({"message":request.user.username})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_skills(request):
    skills = [
        {
            "value": value,
            "label": label
        }
        for value, label in CustomUser.SKILL_CHOICES
    ]

    return Response(skills)


@api_view(['POST'])
@authentication_classes([])
def registerUser(request):
    serializer=registerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
@authentication_classes([])
def loginUser(request):
    serializer=loginSerializer(data=request.data)
    if serializer.is_valid():
        username=serializer.validated_data['username']
        password=serializer.validated_data['password']
        
        user=authenticate(
            request,    
            username=username,
            password=password
        )
        if user is not None:
            login(request, user)
            return Response(
                {
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "phone": user.phone,
                        "role": user.role
                    }
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
# @authentication_classes([])
def logoutUser(request):
    print("request.user", request.user)
    if request.user.is_authenticated:
        logout(request)

        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_200_OK
        )

    return Response(
        {"error": "No user is currently logged in"},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hello(request):
    print(request.user)
    return Response({"message":request.user.username})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Technician(request):
    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "phone": request.user.phone,
        "skill": request.user.skill,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_service(request):
    serializer= bookServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(customer=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_services(request):
    services=ServiceModel.objects.filter(customer=request.user,is_delete= False).order_by('-date')
    serializer=bookServiceSerializer(services,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_services(request):
    services=ServiceModel.objects.filter(customer=request.user,status="pending",is_delete= False).order_by('-date')
    serializer=bookServiceSerializer(services,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_assigned_services(request):
    services=ServiceModel.objects.filter(customer=request.user,status="assigned",is_delete= False).order_by('-date')
    serializer=bookServiceSerializer(services,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_completed_services(request):
    services=ServiceModel.objects.filter(customer=request.user,status="completed",is_delete= False)
    serializer=bookServiceSerializer(services,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inprogress_services(request):
    services=ServiceModel.objects.filter(customer=request.user,status="in progress",is_delete= False)
    serializer=bookServiceSerializer(services,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_service(request,id):
    try:
        services=ServiceModel.objects.get(customer=request.user,id=id,is_delete= False)
        serializer=bookServiceSerializer(services)
        return Response(serializer.data)
    except:
        return Response({"error":"Not found"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_service(request,id):
    try:
        service=ServiceModel.objects.get(customer=request.user,id=id,is_delete= False)
        old_serializer = bookServiceSerializer(service)
        old_data = old_serializer.data
        serializer=bookServiceSerializer(service,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "old_data": old_data,
                "new_data": serializer.data
            },status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"error":"Service not found"},status=status.HTTP_404_NOT_FOUND)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def delete_service(request, id):

    try:
        service = ServiceModel.objects.get(
            customer=request.user,
            id=id,
            is_delete=False
        )

        service.is_delete = True
        service.save()

        serializer = bookServiceSerializer(service)

        return Response(
            {
                "message": "Service deleted successfully",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    except ServiceModel.DoesNotExist:
        return Response(
            {"error": "Service not found"},
            status=status.HTTP_404_NOT_FOUND
        )