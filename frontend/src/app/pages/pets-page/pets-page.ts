import { Component, inject, NgModule, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets-service';
import { Pet } from '../../interfaces/pet';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pets-page',
  imports: [CommonModule],
  templateUrl: './pets-page.html',
  styleUrl: './pets-page.scss',
})
export class PetsPage implements OnInit {
  private petsService = inject(PetsService);
  pets: Pet[] = [];
  next: string | null = null;
  previous: string | null = null;

  currentPage = 1;

  ngOnInit() {
    this.loadPets();
  }

  loadPets(page: number = 1) {
    this.petsService.getPets(page).subscribe({
      next: (res) => {
        this.pets = res.results;
        this.next = res.next;
        this.previous = res.previous;
        this.currentPage = page;
        console.log(this.pets)
      },
      error: (err) => console.error(err),
    });
  }

  nextPage() {
    if (this.next) {
      this.loadPets(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.previous) {
      this.loadPets(this.currentPage - 1);
    }
  }
}
