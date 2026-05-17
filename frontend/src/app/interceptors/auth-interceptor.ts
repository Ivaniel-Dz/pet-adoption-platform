import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyección auth service
  const authService = inject(AuthService);

  // Obtener token en memoria
  const token = authService.accessToken();

  // Request públicos, no se le agrega el token
  const publicRoutes = ['/auth/login/', '/auth/register/', '/auth/refresh/'];

  // Verificar si la ruta es pública
  const isPublicRoute = publicRoutes.some((route) => req.url.includes(route));

  // Si no es una ruta pública y hay un token, agregar el header de autorización
  const authReq =
    !isPublicRoute && token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
      : req.clone({
          withCredentials: true,
        });

  // Enviar el request y manejar errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Token expiro
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            // nuevo request
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.access}` },
              withCredentials: true,
            });
            return next(retryReq);
          }),

          catchError((refreshError) => {
            // logout si falla refresh
            authService.logout().subscribe();
            return throwError(() => refreshError);
          }),
        );
      }
      // Otros errores
      return throwError(() => error);
    }),
  );

};
