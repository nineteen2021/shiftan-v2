from rest_framework import serializers
from shiftan.models import Group, Shift_Range, Store, User, Tmp_Work_Schedule, Work_Schedule, Schedule_Template


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = [
            'id',
            'store_name',
            'address',
            'phone',
            'Store_ID',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            'id',
            'store_FK',
            'group_name',
            'color',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'store_FK',
            'group_FK',
            'email',
            'is_active',
            'is_manager',
            'date_joined',
            'update_time',
            'last_name',
            'first_name',
            'phone',
            'is_store',
            ]
        read_only_fields = ['id',]

class Shift_RangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift_Range
        fields = [
            'id',
            'store_FK',
            'shift_name',
            'start_date',
            'stop_date',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]

class Tmp_Work_Schedule(serializers.ModelSerializer):
    class Meta:
        model = Tmp_Work_Schedule
        fields = [
            'id',
            'user_FK',
            'shift_range_FK',
            'start_time',
            'stop_time',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]

class Work_Schedule(serializers.ModelSerializer):
    class Meta:
        model = Work_Schedule
        fields = [
            'id',
            'user_FK',
            'shift_range_FK',
            'start_time',
            'stop_time',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]

class Schedule_Template(serializers.ModelSerializer):
    class Meta:
        model = Schedule_Template
        fields = [
            'id',
            'user_FK',
            'start_time',
            'stop_time',
            'create_time',
            'update_time',
        ]
        read_only_fields = ['id',]