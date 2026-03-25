import { Component, inject, OnInit, signal } from '@angular/core';
import { PetsService } from '../../services/pets-service';
import { Pet } from '../../interfaces/pet';
import { CommonModule } from '@angular/common';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pets-page',
  imports: [CommonModule, Navigation, Footer, RouterLink],
  templateUrl: './pets-page.html',
  styleUrl: './pets-page.scss',
})
export class PetsPage implements OnInit {
  // Inyección de servicios
  private petsService = inject(PetsService);

  // Estado principal
  pets = signal<Pet[]>([]);
  next = signal<string | null>(null);
  previous = signal<string | null>(null);
  currentPage = signal(1);

  // Filtros
  search = signal('')
  status = signal('')
  species = signal('')
  size = signal('')

  // Cargar los pets al iniciar el componente
  ngOnInit() {
    this.loadPets();
  }

  // Método para cargar los pets, con pagination
  loadPets(page: number = 1) {
    this.petsService.getPets({
      page,
      search: this.search(),
      status: this.status(),
      species: this.species(),
      size: this.size(),
    }).subscribe({
      next: (res) => {
        this.pets.set(res.results);
        this.next.set(res.next);
        this.previous.set(res.previous);
        this.currentPage.set(page);
      },
      error: (err) => console.error(err),
    });
  }

  // Método para Búsquedas
  onSearch(value: string) {
    this.search.set(value);
    this.loadPets(1)
  }

  // Método para Filtro
  onFilterChange(){
    this.loadPets(1) // Reiniciamos a la primera página al cambiar el filtro
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
