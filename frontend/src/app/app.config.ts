import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
// Módulo para realizar peticiones HTTP a la API
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Importa las rutas definidas en el archivo de rutas de la aplicación
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Proporciona el cliente HTTP para realizar peticiones a la API
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
