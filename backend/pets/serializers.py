from rest_framework import serializers
from .models import Pet

# Serializador para el modelo Pet
class PetSerializer(serializers.ModelSerializer):
    # Define un campo de solo lectura
    species_display = serializers.CharField(source='get_species_display', read_only=True)
    size_display = serializers.CharField(source='get_size_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)


    # Especifica el modelo y los campos a incluir en la serialización
    class Meta:
        # El modelo que se va a serializar
        model = Pet
        fields = '__all__'