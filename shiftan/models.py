from django.db import models

# Create your models here.
class Store(models.Model):
    store_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.IntegerField()
    store_ID = models.SlugField(max_length=50, unique=True)    

class Group(models.Model):
    group_name = models.CharField(max_length=50)
    color = models.SlugField(max_length=100)

class Member(models.Model):
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    mail = models.EmailField(max_length=255, unique=True)
    phone = models.IntegerField()
    password = models.SlugField(max_length=50)
    store_FK = models.ForeignKey(Store, on_delete=models.DO_NOTHING)
    group_FK = models.ForeignKey(Group, on_delete=models.DO_NOTHING)
    withdraw = models.BooleanField() #初期値False

class Authority(models.Model):
    authority_name = models.CharField(max_length=50)

class Member_Authority(models.Model):
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)
    authority_FK = models.ForeignKey(Authority, on_delete=models.DO_NOTHING)
    authority = models.BooleanField() #初期値False

class Tmp_Work_Schedule(models.Model):
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    submit_time = models.DateTimeField(auto_now=True, auto_now_add=False)
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)

class Work_Schedule(models.Model):
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField(auto_now=True, auto_now_add=False)
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)

class Shift_Range(models.Model):
    shift_name = models.CharField(max_length=100)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    stop_date = models.DateField(auto_now=False, auto_now_add=False)
    create_date = models.DateField(auto_now=True, auto_now_add=False)
    deadline_date = models.DateField()

class Schedule_Template(models.Model):
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    