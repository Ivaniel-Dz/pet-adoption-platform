from django.db import models
from django.conf import settings
from pets.models import Pet


class Adoption(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pendiente'),
        ('APPROVED', 'Aprobado'),
        ('REJECT', 'Rechazado'),
    ]

    # Usuario que realiza la solicitud
    user = models.ForeignKey(
        # asegura compatibilidad con CustomUser
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='adoptions'
    )

    # Mascota Solicitada
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name='adoption_request'
    )

    # Estado de la solicitud
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='PENDING')
    # Fecha de creación automática
    created_at = models.DateTimeField(auto_now_add=True)

    # Evita duplicar solicitudes PENDIENTES para la misma mascota por el mismo usuario
    class Meta:
        unique_together = ('user', 'pet')

        def __str__(self):
            return f"{self.user.username} -> {self.pet.name} ({self.status})"
