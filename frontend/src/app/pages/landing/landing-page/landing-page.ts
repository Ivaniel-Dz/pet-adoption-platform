import { Component } from '@angular/core';
import { HomeSection } from '../home-section/home-section';

@Component({
  selector: 'app-landing-page',
  imports: [HomeSection,],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
