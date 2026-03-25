import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-section',
  imports: [],
  templateUrl: './home-section.html',
  styleUrl: './home-section.scss',
})
export class HomeSection {
  private router = inject(Router)

  gotToPets(){
    (document.activeElement as HTMLElement)?.blur();// Quita el foco del botón para evitar que quede resaltado después de hacer clic
    this.router.navigate(['/pets'])
  }
}
