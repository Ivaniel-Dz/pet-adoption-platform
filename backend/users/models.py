from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    
    ROLE_CHOICES = (('ADMIN', 'Admin'), ('ADOPTANTE', 'Adoptante'),)

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ADOPTANTE')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # Login con email
    USERNAME_FIELD = 'email'
    # Campos requeridos al crear superusuario
    REQUIRED_FIELDS = ['username']

    # Mostrar el username junto con el email en la representación del usuario
    def __str__(self):
        return f'{self.username} ({self.email})' 
