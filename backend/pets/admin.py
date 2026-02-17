from django.contrib import admin
from .models import Pet

# Configuración del modelo Pet en el panel administrativo.
@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    # Columnas visibles en la lista
    list_display = ('name', 'species', 'breed', 'age', 'size', 'status', 'created_by')
    # Filtros laterales
    list_filter = ('species', 'size', 'status')
    # Buscador
    search_fields = ('name', 'breed')