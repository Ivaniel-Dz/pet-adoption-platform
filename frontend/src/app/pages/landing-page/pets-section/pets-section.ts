import { Component, inject, OnInit } from '@angular/core';
import { PetsService } from '../../../services/pets-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../interfaces/pet';

@Component({
  selector: 'app-pets-section',
  imports: [CommonModule],
  templateUrl: './pets-section.html',
  styleUrl: './pets-section.scss',
})
export class PetsSection implements OnInit {
  // Inyectamos los servicios
  private petsService = inject(PetsService);
  // Inyectamos el Router para navegar a la página de detalles de la mascota
  private router = inject(Router);

  pets: Pet[] = [];

  ngOnInit() {

  }

  goToDetail(id: number) {
    this.router.navigate(['/pet', id]);
  }
}
