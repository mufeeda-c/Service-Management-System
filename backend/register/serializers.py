from decimal import Decimal

from .models import Bill, BillItem, CustomUser,ServiceModel
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
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True,write_only=True)
    
class bookServiceSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    technician =serializers.SerializerMethodField()
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
    def get_technician(self, obj):
        if not obj.technician:
            return None

        return {
            "id": obj.technician.id,
            "username": obj.technician.username,
            "phone": obj.technician.phone,
            "email": obj.technician.email
        }
        
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['role','phone','email','username','skill','id','date_joined','is_active','address','city','pincode','photo','experience','about']

class BillItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = BillItem
        fields = [
            "id",
            "description",
            "quantity",
            "price",
            "subtotal",
        ]

    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Description cannot be empty."
            )
        return value.strip()

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value

    def validate_price(self, value):
        if value < Decimal("0.00"):
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value


class BillSerializer(serializers.ModelSerializer):
    items = BillItemSerializer(many=True, read_only=True)
    service_id = serializers.IntegerField(
        source="service.id",
        read_only=True
    )
    technician_id = serializers.IntegerField(
        source="technician.id",
        read_only=True
    )

    class Meta:
        model = Bill
        fields = [
            "id",
            "service_id",
            "technician_id",
            "items",
            "total_amount",
            "created_at",
            "updated_at",
        ]
