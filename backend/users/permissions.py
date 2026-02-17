from rest_framework.permissions import BasePermission

# Permiso según el rol
class IsAdminUserRole(BasePermission):
    # Permite acceso solo a usuarios con el rol admin
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'ADMIN'