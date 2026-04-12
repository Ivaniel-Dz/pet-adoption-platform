import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { HomeSection } from './home-section/home-section';
import { PetsSection } from './pets-section/pets-section';
import { Footer } from '../../layouts/footer/footer';
import { AboutSection } from './about-section/about-section';
import { CtasSection } from './ctas-section/ctas-section';
import { ContactSection } from './contact-section/contact-section';

@Component({
  selector: 'app-landing-page',
  imports: [Navigation, HomeSection, PetsSection, AboutSection, CtasSection, ContactSection ,Footer, ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
