# Modelos para conteo
from django.db.models import Count
# Clases para manejo de fechas
from django.utils.timezone import make_aware
from datetime import datetime
from django.db.models.functions import TruncMonth
from django.utils.timezone import now
from datetime import timedelta
# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
# Importación de los modelos
from pets.models import Pet
from adoptions.models import Adoption
from users.models import User


class AdminStatsView(APIView):
    # Solo accesible para administradores
    permission_classes = [IsAdminUser]

    # Método GET para obtener estadísticas
    def get(self, request):
        # Estadísticas generales
        data = {
            # Estadísticas de mascotas
            'total_pets': Pet.objects.count(),
            'available_pets': Pet.objects.filter(status='AVAILABLE').count(),
            'adopted_pets': Pet.objects.filter(status='ADOPTED').count(),
            # Estadísticas de adopciones
            'total_adoptions': Adoption.objects.count(),
            'pending_adoptions': Adoption.objects.filter(status='PENDING').count(),
            'approved_adoptions': Adoption.objects.filter(status='APPROVED').count(),
            # Estadísticas de usuarios
            'total_users': User.objects.count(),
        }


        # Adopción por mes
        six_months_ago = now() - timedelta(days=180)

        adoption_by_month = (
            Adoption.objects.filter(
                created_at__gte=six_months_ago, status='APPROVED')
            .annotate(month=TruncMonth('created_at'))
            .values('month')
            .annotate(count=Count("id")).order_by('month')
        )


        # Mascotas por tipo
        pets_by_type = (
            Pet.objects.values('species').annotate(
                count=Count('id')).order_by("-count")
        )


        # Crecimiento de adopciones
        current_month_start = now().replace(day=1, hour=0, minute=0, second=0)
        previous_month_start = (current_month_start -
                                timedelta(days=1)).replace(day=1)

        current_month_adoption = Adoption.objects.filter(
            created_at__gte=current_month_start, status='APPROVED'
        ).count()

        previous_month_adoption = Adoption.objects.filter(
            created_at__gte=previous_month_start,
            created_at__lt=current_month_start,
            status="APPROVED"
        ).count()

        growth_percentage = 0

        if previous_month_adoption > 0:
            growth_percentage = (
                (current_month_adoption - previous_month_adoption) /
                previous_month_adoption
            )*100


        # Ultima adopciones
        recent_adoptions = (
            Adoption.objects.select_related("user", "pet").filter(
                status="APPROVED").order_by("-created_at")[:5]
        )

        recent_adoptions_data = [
            {
                'id': adoption.id,
                'user': adoption.user.email,
                'pet': adoption.pet.name,
                'date': adoption.created_at,
            }
            for adoption in recent_adoptions
        ]


        # Respuesta con todas las estadísticas
        return Response({
            "data": data,
            "adoption_by_month": adoption_by_month,
            "pets_by_type": pets_by_type,
            "growth_metrics": {
                "current_month": current_month_adoption,
                "previous_month": previous_month_adoption,
                "growth_percentage": round(growth_percentage, 2),
            },
            "recent_adoptions": recent_adoptions_data,
        })
