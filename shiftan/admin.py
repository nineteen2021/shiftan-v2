from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from .models import Schedule_Template, Shift_Range, Tmp_Work_Schedule, User, Store, Group, Work_Schedule

class MyUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'

class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email','first_name','last_name')

class MyUserAdmin(UserAdmin):
    fieldsets = (
        ('ユーザー情報', {'fields': ('email', 'password', 'last_name','first_name', 'phone', 'store_FK', 'group_FK')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_manager', 'is_store',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    form = MyUserChangeForm
    add_form = MyUserCreationForm
    list_display = ('email', 'last_name','first_name', 'is_staff', 'is_manager')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'last_name','first_name')
    ordering = ('email',)

admin.site.register(User, MyUserAdmin)
admin.site.register(Store)
admin.site.register(Group)
admin.site.register(Shift_Range)
admin.site.register(Tmp_Work_Schedule)
admin.site.register(Work_Schedule)
admin.site.register(Schedule_Template)
# Register your models here.