import { Routes } from '@angular/router';
// Importamos los componentes o paginas que queremos usar en las rutas
import { LandingPage } from './pages/landing/landing-page/landing-page';

// Definimos las rutas de la aplicación
export const routes: Routes = [
    {
        path: '', // Ruta raíz, se muestra la Landing Page
        component: LandingPage, // Componente que se renderiza para esta ruta
        title: 'Landing Page' // Título de la página, se muestra en la pestaña del navegador
    }
];
