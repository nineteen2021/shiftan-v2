from django.urls import path
from .views import UserApi

urlpatterns = [
    path('users/', UserApi.as_view()),
]