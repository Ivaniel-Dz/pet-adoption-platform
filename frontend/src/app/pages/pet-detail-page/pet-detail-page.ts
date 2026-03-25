import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../services/pets-service';
import { CommonModule } from '@angular/common';
import { Pet } from '../../interfaces/pet';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';

@Component({
  selector: 'app-pet-detail-page',
  imports: [CommonModule, Navigation, Footer],
  templateUrl: './pet-detail-page.html',
  styleUrl: './pet-detail-page.scss',
})
export class PetDetailPage implements OnInit {
  // Inyectamos los servicios
  private route = inject(ActivatedRoute);
  private petService = inject(PetsService);

  // Creamos una señal para almacenar los detalles de la mascota
  pet = signal<Pet | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el ID de la mascota desde la ruta
    this.loadPetDetail(id);
  }

  // Método para cargar los detalles
  loadPetDetail(id: number) {
    this.petService.getPetById(id).subscribe({
      next: (res) => this.pet.set(res),
      error: (err) => console.error(err),
    });
  }

  // Método para mostrar foto de la mascota
  getPetImage(): string {
    return (
      this.pet()?.image_url || // Foto de la mascota desde la API
      'https://cdn.pixabay.com/photo/2024/09/13/14/50/adult-9045197_1280.jpg' // Foto por defecto si no hay foto disponible
    );
  }
}
