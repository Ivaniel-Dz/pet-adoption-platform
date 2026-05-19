import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)

  const router = inject(Router)

  // Verificar autenticación
  if(authService.isAuthenticated()) {
    return true;
  }
  
  // Redirigir a login
  router.navigate(['/auth/login'])

  return false;
};
