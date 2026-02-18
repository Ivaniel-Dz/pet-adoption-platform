from rest_framework import serializers
from .models import Pet

# Serializador para el modelo Pet
class PetSerializer(serializers.ModelSerializer):
    class Meta:
        # El modelo que se va a serializar
        model = Pet
        fields = '__all__'