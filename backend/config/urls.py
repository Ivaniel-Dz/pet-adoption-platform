from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, )

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # JWT, Prueba
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view, name='token_refresh'),

    # Users
    path('api/users/', include('users.urls')),

    # Pets
    path('api/', include('pets.urls')),

    # Adoptions
    path('api/', include('adoptions.urls')),

    # Dashboard Stats
    path('api/' , include('dashboard.urls')),
]
