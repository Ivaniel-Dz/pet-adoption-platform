import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';

@Component({
  selector: 'app-volunteer-page',
  imports: [Navigation, Footer],
  templateUrl: './volunteer-page.html',
  styleUrl: './volunteer-page.scss',
})
export class VolunteerPage {

}
