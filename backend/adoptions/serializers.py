from rest_framework import serializers
from .models import Adoption


class AdoptionSerializer(serializers.ModelSerializer):
    # Define los campos del modelo que se serializan y los que son solo lectura
    class Meta:
        model = Adoption
        fields = '__all__'
        read_only_fields = ('user', 'create_at')

    # Metodo que valida los datos de la solicitud de adopcion antes de guardarla
    def validate(self, data):
        # Validaciones solo aplican para nuevas solicitudes, no para actualizaciones
        if self.instance is None:
            pet = data.get('pet')
            user = self.context['request'].user

            # Verifica que la mascota este disponible para ser adoptada
            if pet.status != 'AVAILABLE':
                raise serializers.ValidationError(
                    "Esta mascota no esta disponible para adopción.")

            # Verifica que no haya una solicitud aprobada ya existente para la mascota
            if Adoption.objects.filter(pet=pet, status='APPROVED').exists():
                raise serializers.ValidationError(
                    "Esta mascota ya fue adoptada")

            # Verifica que el usuario no tenga una solicitud pendiente para la misma mascota
            if Adoption.objects.filter(pet=pet, user=user, status='PENDING').exists():
                raise serializers.ValidationError(
                    "Ya tiene una solicitud pendiente de mascota")

        return data
