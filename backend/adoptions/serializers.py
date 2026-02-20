from rest_framework import serializers
from .models import Adoption


class AdoptionSerializer(serializers.ModelSerializer):
    # 
    class Meta:
        model = Adoption
        fields = '__all__'
        read_only_fields = ('user', 'create_at')

    # 
    def validate(self, data):
        # 
        if self.instance is None:
            pet = data.get('pet')
            user = self.context['request'].user
            
            # 
            if pet.status != 'AVAILABLE':
                raise serializers.ValidationError(
                    "Esta mascota no esta disponible para adopción.")
            
            #
            if Adoption.objects.filter(pet=pet, status='APPROVED').exists():
                raise serializers.ValidationError(
                    "Esta mascota ya fue adoptada")
            
            #
            if Adoption.objects.filter(pet=pet, user=user, status='PENDING').exists():
                raise serializers.ValidationError(
                    "Ya tiene una solicitud pendiente de mascota")
        
        return data
