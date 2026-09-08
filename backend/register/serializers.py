from .models import CustomUser,ServiceModel
from rest_framework import serializers

class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['role','phone','email','username','password','skill']
    def create(self,validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            role=validated_data['role'],
            skill=validated_data['skill']
        )
        return user

class loginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only=True)
    
class bookServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=ServiceModel
        fields="__all__"
        read_only_fields = [
            "customer",
            "is_delete",
            "is_active", 
        ]
        
