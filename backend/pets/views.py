from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
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

    # Filtros habilitados
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # Filtrar por estado y especie
    filter_fields = ['status', 'species']
    # Búsqueda por nombre
    search_fields = ['name']
    # Ordenamiento permitido
    ordering_fields = ['created_at', 'age', 'name']

    # Definimos permisos personalizados según la acción.
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]

        return [permissions.IsAdminUser()]
