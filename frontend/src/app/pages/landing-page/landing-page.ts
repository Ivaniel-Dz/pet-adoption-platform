import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { HomeSection } from './home-section/home-section';
import { PetsSection } from './pets-section/pets-section';
import { Footer } from '../../layouts/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [Navigation, HomeSection, PetsSection, Footer, ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
