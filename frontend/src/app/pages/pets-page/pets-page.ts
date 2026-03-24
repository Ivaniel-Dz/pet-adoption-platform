import { Component, inject, OnInit, signal } from '@angular/core';
import { PetsService } from '../../services/pets-service';
import { Pet } from '../../interfaces/pet';
import { CommonModule } from '@angular/common';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';

@Component({
  selector: 'app-pets-page',
  imports: [CommonModule, Navigation, Footer],
  templateUrl: './pets-page.html',
  styleUrl: './pets-page.scss',
})
export class PetsPage implements OnInit {
  // Inyección de servicios
  private petsService = inject(PetsService);

  // Signals
  pets = signal<Pet[]>([]);
  next = signal<string | null>(null);
  previous = signal<string | null>(null);
  currentPage = signal(1);

  // Cargar los pets al iniciar el componente
  ngOnInit() {
    this.loadPets();
  }

  // Método para cargar los pets, con pagination
  loadPets(page: number = 1) {
    this.petsService.getPets(page).subscribe({
      next: (res) => {
        this.pets.set(res.results);
        this.next.set(res.next);
        this.previous.set(res.previous);
        this.currentPage.set(page);

        console.log(this.pets());
      },
      error: (err) => console.error(err),
    });
  }

  // Métodos para manejar la paginación
  nextPage() {
    if (this.next()) {
      this.loadPets(this.currentPage() + 1);
    }
  }

  // Método para manejar la paginación hacia atrás
  prevPage() {
    if (this.previous()) {
      this.loadPets(this.currentPage() - 1);
    }
  }
}
