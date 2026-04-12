import { Routes } from '@angular/router';
// Importamos los componentes o paginas que queremos usar en las rutas
import { LandingPage } from './pages/landing-page/landing-page';
import { PetsPage } from './pages/pets-page/pets-page';
import { PetDetailPage } from './pages/pet-detail-page/pet-detail-page';
import { DonationPage } from './pages/donation-page/donation-page';
import { AdoptionInfoPage } from './pages/adoption-info-page/adoption-info-page';
import { VolunteerPage } from './pages/volunteer-page/volunteer-page';

// Definimos las rutas de la aplicación
export const routes: Routes = [
  {
    path: '', // Ruta raíz, se muestra la Landing Page
    component: LandingPage, // Componente que se renderiza para esta ruta
    title: 'Inicio', // Título de la página, se muestra en la pestaña del navegador
  },
  {
    path: 'pets',
    component: PetsPage,
    title: 'Mascotas en Adopción',
  },
  {
    path: 'pet/:id',
    component: PetDetailPage,
    title: 'Detalles de la Mascota',
  },
  {
    path: 'adopt-info',
    component: AdoptionInfoPage,
    title: 'Como Adoptar',
  },
  {
    path: 'donation',
    component: DonationPage,
    title: 'Como Donar',
  },
  {
    path: 'volunteer',
    component: VolunteerPage,
    title: 'Como ser Voluntario',
  },
];
