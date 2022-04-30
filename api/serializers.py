from rest_framework import serializers
from shiftan.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'is_active', 'is_manager', 'date_joined', 'update_time', 'last_name', 'first_name', 'phone', 'is_store')
        read_only_fields = ('id',)