from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import User
from .permissions import IsAdminUserRole

# Registro de Usuario
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Devuelve el perfil del usuario autenticado
class MeView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    # Retorna el usuario autenticado, No es necesario pasar un ID
    def get_object(self):
        return self.request.user

# Lista de todo los Usuarios (Solo para Admin)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAdminUserRole]