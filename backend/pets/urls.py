from rest_framework.routers import DefaultRouter
from .views import PetViewSet

# Definimos el router y registramos el ViewSet de mascotas.
router = DefaultRouter()
router.register(r'pets', PetViewSet) 
urlpatterns = router.urls
