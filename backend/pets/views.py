from rest_framework import viewsets, permissions
from .models import Pet
from .serializers import PetSerializer

"""
    ViewSet para gestionar mascotas.
    
    - List y retrieve → público
    - Create, update, delete → solo admin
"""

class PetViewSet(viewsets.ModelViewSet):
    # Definimos el queryset y el serializer para el ViewSet.
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    # Definimos permisos personalizados según la acción.
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]

        return [permissions.IsAdminUser()]
