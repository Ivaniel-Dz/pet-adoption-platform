from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Adoption
from .serializers import AdoptionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class AdoptionViewSet(viewsets.ModelViewSet):
    queryset = Adoption.objects.all()
    serializer_class = AdoptionSerializer
    permission_classes = [IsAuthenticated]

    # Filtros habilitados
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    # Filtrar por estado
    filterset_fields = ['status']
    # Ordenar por fecha
    ordering_fields = ['created_at']

    #  Controla qué solicitudes puede ver cada usuario.
    def get_queryset(self):
        user = self.request.user

        # Si es admin ve todo
        if user.is_staff:
            return Adoption.objects.all()
        
        # Si es adoptante solo ve su solicitudes
        return Adoption.objects.filter(user=user)

    #   Asigna automáticamente el usuario autenticado.
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    #  Se ejecuta cuando un admin cambia el estado.
    def perform_update(self, serializer):
        adoption = serializer.save()

        # Si fuera aprobado
        if adoption.status == 'APPROVED':
            pet = adoption.pet
            pet.status = 'ADOPTED'
            pet.save()
