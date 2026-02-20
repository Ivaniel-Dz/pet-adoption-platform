from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Adoption
from .serializers import AdoptionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.exceptions import ValidationError


class AdoptionViewSet(viewsets.ModelViewSet):
    # Especifica el serializador para convertir datos Adoption a JSON y viceversa
    serializer_class = AdoptionSerializer
    # Requiere autenticación para acceder a cualquier endpoint
    permission_classes = [IsAuthenticated]

    # Habilita filtrado por campos específicos y ordenamiento de resultados
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    # Permite filtrar adopciones por campo 'status' (ej: ?status=APPROVED)
    filterset_fields = ['status']
    # Permite ordenar resultados por fecha de creación (ej: ?ordering=created_at)
    ordering_fields = ['created_at']


    # Controla qué solicitudes puede ver cada usuario según su rol.
    def get_queryset(self):
        # Obtiene el usuario autenticado de la solicitud HTTP
        user = self.request.user

        # Si el usuario es administrador (is_staff=True), puede ver todas las solicitudes
        if user.is_staff:
            return Adoption.objects.all()

        # Si es un adoptante regular, solo ve sus propias solicitudes (filtradas por user)
        return Adoption.objects.filter(user=user)


    # Asigna automáticamente el usuario autenticado a la nueva adopción.
    def perform_create(self, serializer):
        # Guarda la nueva adopción asociándola al usuario que la creó
        serializer.save(user=self.request.user)


    # Valida cambios de estado y actualiza la mascota cuando se aprueba la solicitud.
    def perform_update(self, serializer):
        # Obtiene la instancia actual de la adopción que se está actualizando
        adoption = serializer.instance  # objeto actual
        # Extrae el nuevo estado que se intenta asignar
        new_status = serializer.validated_data.get('status')

        # Validaciones especiales solo si intentan cambiar el estado a APROBADO
        if new_status == 'APPROVED':

            # Obtiene la mascota asociada a esta solicitud de adopción
            pet = adoption.pet

            # Verifica que la mascota no este ya adoptada (estado ADOPTED)
            if pet.status == 'ADOPTED':
                # Lanza un error si la mascota ya tiene adoptante
                raise ValidationError(
                    "No se puede aprobar: la mascota ya fue adoptada."
                )

            # Verifica que no exista otra solicitud APROBADA para la misma mascota
            if Adoption.objects.filter(
                pet=pet,
                status='APPROVED'
            ).exists():
                # Lanza un error si ya hay una solicitud aprobada en proceso
                raise ValidationError(
                    "Ya existe una solicitud aprobada para esta mascota."
                )

        # Si pasa todas las validaciones anteriores, guarda los cambios
        adoption = serializer.save()

        # Si la solicitud fue aprobada, actualiza automáticamente la mascota
        if adoption.status == 'APPROVED':
            # Obtiene la mascota asociada
            pet = adoption.pet
            # Marca la mascota como ADOPTADA
            pet.status = 'ADOPTED'
            # Persiste los cambios en la base de datos
            pet.save()
