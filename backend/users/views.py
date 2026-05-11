from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

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

# Login del usuario usando JWT Seguro
class LoginView(APIView):
    """
    Guarda el refresh token en cookie HttpOnly
    y devuelve solo el access token.
    """

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        # Buscar usuario por email
        user = User.objects.filter(email=email).first()

        # Validar credenciales
        if not user or not user.check_password(password):
            return Response(
                {'error': 'Credenciales inválidas'},
                status=400
            )

        # Generar tokens
        refresh = RefreshToken.for_user(user)

        access_token = str(refresh.access_token)

        # Crear response
        response = Response({
            'access': access_token
        })

        # Guardar refresh token en cookie segura
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),

            httponly=True,
            secure=False,  # True en producción HTTPS
            samesite='Lax',

            max_age=7 * 24 * 60 * 60
        )

        return response

# Logout del usuario eliminando el refresh token
class LogoutView(APIView):

    def post(self, request):

        try:
            refresh_token = request.COOKIES.get(
                'refresh_token'
            )

            token = RefreshToken(refresh_token)

            # invalidar token
            token.blacklist()

            response = Response({
                'message': 'Logout exitoso'
            })

            response.delete_cookie(
                'refresh_token'
            )

            return response

        except Exception:
            return Response(
                {'error': 'Error al cerrar sesión'},
                status=400
            )


# Endpoint para renovar el access token usando el refresh token
class RefreshTokenView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        try:
            refresh_token = request.COOKIES.get(
                'refresh_token'
            )

            refresh = RefreshToken(refresh_token)

            access = str(refresh.access_token)

            return Response({
                'access': access
            })

        except Exception:
            return Response(
                {'error': 'Token inválido'},
                status=401
            )
