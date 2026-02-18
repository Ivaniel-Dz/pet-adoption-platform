from rest_framework import serializers
from .models import Adoption


class AdoptionSerializer(serializers.ModelSerializer):
    # Que campos se exponen
    class Meta:
        model = Adoption
        fields = '__all__'
        read_only_fields = ('user', 'create_at')

    # Validar que no permita solicitar mascotas no disponible
    def validate(self, data):

        if self.instance is None:
            pet = data.get('pet')

            if pet.status != 'AVAILABLE':
                raise serializers.ValidationError(
                    "Esta mascota no esta disponible para adopción.")

        return data
