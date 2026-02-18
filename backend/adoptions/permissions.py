from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Cualquiera autenticado puede crear (POST)
        if request.method == 'POST':
            return request.user.is_authenticated

        # Solo admin puede modificar (PUT, PATH, DELETE)
        return request.user.is_staff
