from django.db import models
from django.conf import settings

# Modelo que representa una mascota disponible para adopción
class Pet(models.Model):
    # Opciones de especies
    SPECIES_CHOICES = (
        ('DOG', 'Perro'),
        ('CAT', 'Gato')
    )

    # Opciones de tamaño
    SIZE_CHOICES = (
        ('SMALL', 'Pequeño'),
        ('MEDIUM', 'Mediano'),
        ('LARGE', 'Grande'),
    )

    # Opciones de estado de adopción
    STATUS_CHOICES = (
        ('AVAILABLE', 'Disponible'),
        ('ADOPTED', 'Adoptado'),
    )

    name = models.CharField(max_length=100)
    species = models.CharField(max_length=10, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=100, blank=True)  # Opcional
    age = models.PositiveIntegerField(max_length=100, blank=True)  # Opcional
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    description = models.TextField(blank=True)  # Opcional
    image_url = models.URLField(
        max_length=500, blank=True, null=True, help_text="URL de la imagen alojada externamente")  # Opcional
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pets_created')
    created_at = models.DateTimeField(auto_now_add=True)

    # Representación en texto del objeto.
    def __str__(self):
        return f"{self.name} - {self.species}"
