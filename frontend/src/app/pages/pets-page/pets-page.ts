import { Component, inject, OnInit, signal } from '@angular/core';
import { PetsService } from '../../services/pets-service';
import { Pet } from '../../interfaces/pet';

@Component({
  selector: 'app-pets-page',
  standalone: true,
  templateUrl: './pets-page.html',
  styleUrl: './pets-page.scss',
})
export class PetsPage implements OnInit {
  private petsService = inject(PetsService);

  // 🔥 Signals
  pets = signal<Pet[]>([]);
  next = signal<string | null>(null);
  previous = signal<string | null>(null);
  currentPage = signal(1);

  ngOnInit() {
    this.loadPets();
  }

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

  nextPage() {
    if (this.next()) {
      this.loadPets(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.previous()) {
      this.loadPets(this.currentPage() - 1);
    }
  }
}
