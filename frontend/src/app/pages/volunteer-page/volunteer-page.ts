import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';
import { LucideHeart, LucideTimer, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-volunteer-page',
  imports: [Navigation, LucideHeart, LucideTimer, LucideUser, Footer],
  templateUrl: './volunteer-page.html',
  styleUrl: './volunteer-page.scss',
})
export class VolunteerPage {

}
