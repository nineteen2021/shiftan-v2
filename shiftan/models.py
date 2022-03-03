from django.db import models

# Create your models here.
class Store(models.Model):
    store_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.IntegerField()
    store_ID = models.SlugField(max_length=100)

class Member(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    mail = models.EmailField(max_length=255)
    user_ID = models.SlugField(max_length=100)
    password = models.SlugField(max_length=100)
    store_FK = models.ForeignKey(Store, on_delete=models.DO_NOTHING)
    withdraw = models.BooleanField() #初期値False

class Authority(models.Model):
    authority_name = models.CharField(max_length=100)

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

class Group(models.Model):
    group_name = models.CharField(max_length=100)
    color = models.SlugField(max_length=100)