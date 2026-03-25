import { Component, inject, OnInit, signal } from '@angular/core';
import { PetsService } from '../../../services/pets-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../interfaces/pet';

@Component({
  selector: 'app-pets-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './pets-section.html',
  styleUrl: './pets-section.scss',
})
export class PetsSection implements OnInit {
  // Inyectamos los servicios
  private petsService = inject(PetsService);

  // Creamos una señal para almacenar las mascotas
  pets = signal<Pet[]>([]);

  // Iniciamos la carga de mascotas al cargar el componente
  ngOnInit() {
    this.loadPets();
  }

  // Método para cargar las mascotas desde el servicio
  loadPets() {
    this.petsService.getPets({ page: 1 }).subscribe({
      next: (res) => {
        this.pets.set(res.results);
      },
      error: (err) => console.error(err),
    });
  }
}
