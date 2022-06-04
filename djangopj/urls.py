"""djangopj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from api import views as apiviews
from rest_framework_simplejwt import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('shiftan/', include("shiftan.urls")),
    path('api/', include(apiviews.router.urls)),
    path('api-auth/', include('djoser.urls.jwt')),
    path('api-auth/', include('djoser.urls')),
    # トークン取得
    # localhost:8000/api-auth/jwt/create/
    # トークン再取得
    # localhost:8000/api-auth/jwt/refresh/
    # トークン検証
    # localhost:8000/api-auth/jwt/verify/
]