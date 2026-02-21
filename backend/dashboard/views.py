# Importaciones de Class-Based Views y otras utilidades de Django REST Framework
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
# Importación de los modelos
from pets.models import Pet
from adoptions.models import Adoption
from users.models import User

class AdminStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        data = {
            # Estadísticas de mascotas
            'total_pets': Pet.objects.count(),
            'available_pets': Pet.objects.filter(status='AVAILABLE').count(),
            'adopted_pets': Pet.objects.filter(status='ADOPTED').count(),
            # Estadísticas de adopciones
            'total_adoptions': Adoption.objects.count(),
            'pending_adoptions': Adoption.objects.filter(status='PENDING').count(),
            'approved_adoptions': Adoption.objects.filter(status='APPROVED').count(),
            # Estadísticas de usuarios
            'total_users': User.objects.count(),
        }

        return Response(data)