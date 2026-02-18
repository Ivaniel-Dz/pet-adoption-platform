from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Adoption
from .serializers import AdoptionSerializer
from .permissions import IsAdminOrReadOnly


class AdoptionViewSet(viewsets.ModelViewSet):
    queryset = Adoption.objects.all()
    serializer_class = AdoptionSerializer
    permission_classes = [IsAuthenticated & IsAdminOrReadOnly]

    #  Se ejecuta automáticamente al hacer POST. Aquí asignamos el usuario autenticado.
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    #  Se ejecuta cuando un admin cambia el estado.
    def perform_update(self, serializer):
        adoption = serializer.save()

        # Si fuera aprobado
        if adoption.status == 'APPROVED':
            pet = adoption.pet
            pet.available = False
            pet.save()
