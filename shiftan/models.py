from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.mail import send_mail
from django.utils import timezone
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _ # 多言語対応するために使用されている関数

# Create your models here.
class UserManager(BaseUserManager): # emailは必須項目なので、emailがからの場合は例外が発生するように設定
    use_in_migrations = True

    # 通常ユーザー作成用のメソッド
    def _create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Emailを入力して下さい')
        email = self.normalize_email(email)
        email = email.lower()
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self.db) # 実際にユーザーを作成
        return user
        
    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, username, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff=Trueである必要があります。')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser=Trueである必要があります。')
        return self._create_user(username, email, password, **extra_fields)

class Store(models.Model):
    class Meta:
        db_table = 'store'
        verbose_name = verbose_name_plural ='店舗'

    store_name = models.CharField("店舗名",max_length=100, unique=True, null=False, blank=False)
    address = models.CharField("住所",max_length=100, null=False, blank=False)
    phone = models.CharField("電話番号", max_length=15, null=False, blank=False)    # https://www.delftstack.com/ja/howto/django/django-phone-number-field/  このサイトのモジュール入れる予定
    store_ID = models.SlugField("店舗ID",max_length=50, unique=True, null=False, blank=False)    
    create_time = models.DateTimeField("店舗作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("店舗情報更新時間",auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.store_name

class Group(models.Model):
    class Meta:
        db_table = 'group'
        verbose_name = verbose_name_plural ='グループ'

    store_FK = models.ForeignKey(Store, on_delete=models.CASCADE)
    group_name = models.CharField("グループ名",max_length=50, null=False, blank=False)
    color = models.CharField("グループカラー",max_length=100, null=False, blank=False)
    create_time = models.DateTimeField("グループ作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("グループ更新時間",auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.group_name

class User(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator() # validatorとは入力チェック

    store_FK = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True, blank=True)
    group_FK = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)
    username = models.CharField(_("username"), max_length=50, validators=[username_validator], blank=True)
    email = models.EmailField(_("email_address"), unique=True) # emailでのログインとする
    is_staff = models.BooleanField(_("staff status"), default=False) # 管理画面のアクセス可否
    is_active = models.BooleanField(_("active"), default=True) # ログインの可否
    is_manager = models.BooleanField("manager", default=False) # 店長かどうか
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now) # アカウントの作成日時
    update_time = models.DateTimeField("アカウント情報更新時間",auto_now=False, auto_now_add=True)
    last_name = models.CharField("名字", max_length=50, null=False, blank=False)
    first_name = models.CharField("名前", max_length=50, null=False, blank=False)
    phone = models.CharField("電話番号", max_length=15, null=False, blank=False)
    is_store = models.BooleanField("店舗認証", default=False)

    objects = UserManager() # views.pyでUserモデルの情報を取得する際などで利用
    USERNAME_FIELD = "email" # ここをemailにすることでメールアドレスでのログインが可能になる
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ['username','last_name','first_name','phone','is_manager']

    class Meta:
        verbose_name = verbose_name_plural = 'ユーザー'

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

class Shift_Range(models.Model):
    class Meta:
        db_table = 'shift_range'
        verbose_name = verbose_name_plural ='シフト範囲'

    store_FK = models.ForeignKey(Store, on_delete=models.CASCADE)
    shift_name = models.CharField("シフト名",max_length=100, null=False, blank=False)
    start_date = models.DateField("開始日",auto_now=False, auto_now_add=False)
    stop_date = models.DateField("終了日",auto_now=False, auto_now_add=False)
    deadline_date = models.DateField("締切日",auto_now=False, auto_now_add=False, null=True, blank=True)
    create_time = models.DateTimeField("シフト作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト更新時間",auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.shift_name

class Tmp_Work_Schedule(models.Model):
    class Meta:
        db_table = 'tmp_work_schedule'
        verbose_name = verbose_name_plural ='シフト希望'

    user_FK = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    shift_range_FK = models.ForeignKey(Shift_Range, on_delete=models.CASCADE)
    start_time = models.DateTimeField("シフト希望開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("シフト希望終了時間",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフト希望提出時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト希望更新時間",auto_now=False, auto_now_add=True)

class Work_Schedule(models.Model):
    class Meta:
        db_table = 'work_schedule'
        verbose_name = verbose_name_plural ='作成シフト'

    user_FK = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    shift_range_FK = models.ForeignKey(Shift_Range, on_delete=models.CASCADE)
    start_time = models.DateTimeField("バイト開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("バイト終了時間",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフト作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフト更新時間",auto_now=False, auto_now_add=True)
    
class Schedule_Template(models.Model):
    class Meta:
        db_table = 'schedule_template'
        verbose_name = verbose_name_plural ='シフトテンプレ'

    user_FK = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField("シフトテンプレ開始時間",auto_now=False, auto_now_add=False)
    stop_time = models.DateTimeField("シフトテンプレ終了時間",auto_now=False, auto_now_add=False)
    create_time = models.DateTimeField("シフトテンプレ作成時間",auto_now=True, auto_now_add=False)
    update_time = models.DateTimeField("シフトテンプレ更新時間",auto_now=False, auto_now_add=True)