from .models import CustomUser
from rest_framework import serializers

class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['role','phone','email','username','password']
    def create(self,validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            role=validated_data['role']
        )
        return user

class loginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)