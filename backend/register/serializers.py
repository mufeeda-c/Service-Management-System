from .models import CustomUser,ServiceModel
from rest_framework import serializers

class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['role','phone','email','username','password','skill']
        extra_kwargs = {
            'password': {'write_only': True},
            'skill': {'required': False, 'allow_null': True}
        }
    def create(self,validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            role=validated_data['role'],
            skill=validated_data.get('skill')
        )
        return user

class loginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only=True)
    
class bookServiceSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()

    class Meta:
        model=ServiceModel
        fields="__all__"
        read_only_fields = [
            "customer",
            "is_delete",
            "is_active", 
            "created_at"
        ]
    def get_customer(self, obj):
        return {
            "id": obj.customer.id,
            "username": obj.customer.username,
            "phone":obj.customer.phone,
            "email":obj.customer.email
        }
        
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['role','phone','email','username','skill','id']
