from django.db import models

# Create your models here.
class Store(models.Model):
    store_name = models.CharField("店舗名",max_length=100, null=False, blank=False)
    address = models.CharField("住所",max_length=100, null=False, blank=False)
    phone = models.IntegerField()    # https://www.delftstack.com/ja/howto/django/django-phone-number-field/  このサイトのモジュール入れる予定
    store_ID = models.SlugField("店舗ID",max_length=50, unique=True, null=False, blank=False)    

class Group(models.Model):
    group_name = models.CharField("グループ名",max_length=50, null=False, blank=False)
    color = models.SlugField("グループカラー",max_length=100, null=False, blank=False)

class Member(models.Model):
    last_name = models.CharField("名字",max_length=50, null=False, blank=False)
    first_name = models.CharField("名前",max_length=50, null=False, blank=False)
    mail = models.EmailField("メールアドレス",max_length=255, unique=True, null=False, blank=False)
    phone = models.IntegerField()
    password = models.SlugField("パスワード",max_length=50, null=False, blank=False)
    store_FK = models.ForeignKey(Store, on_delete=models.DO_NOTHING)
    group_FK = models.ForeignKey(Group, on_delete=models.DO_NOTHING)
    withdraw = models.BooleanField() #初期値False

class Authority(models.Model):
    authority_name = models.CharField("権限名",max_length=50)

class Member_Authority(models.Model):
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)
    authority_FK = models.ForeignKey(Authority, on_delete=models.DO_NOTHING)
    authority = models.BooleanField() #初期値False

class Tmp_Work_Schedule(models.Model):
    start_time = models.DateTimeField("シフト希望開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("シフト希望終了時間",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフト希望提出時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト希望更新時間",auto_now=False, auto_now_add=True)
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)

class Work_Schedule(models.Model):
    start_time = models.DateTimeField("バイト開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("バイト終了時間",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフト希望提出時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト希望更新時間",auto_now=False, auto_now_add=True)
    member_FK = models.ForeignKey(Member, on_delete=models.DO_NOTHING)

class Shift_Range(models.Model):
    shift_name = models.CharField("シフト名",max_length=100, null=False, blank=False)
    start_date = models.DateField("募集開始日",auto_now=False, auto_now_add=False)
    stop_date = models.DateField("募集終了日",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフト作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト更新時間",auto_now=False, auto_now_add=True)

class Schedule_Template(models.Model):
    start_time = models.DateTimeField("シフトテンプレ開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("シフトテンプレ終了時間",auto_now=False, auto_now_add=False)
    