import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';
import { LucideHeartHandshake, LucideHouseHeart, LucidePawPrint, LucideSquareCheckBig } from '@lucide/angular';

@Component({
  selector: 'app-adoption-info-page',
  imports: [
    Navigation,
    LucidePawPrint,
    LucideSquareCheckBig,
    LucideHouseHeart,
    LucideHeartHandshake,
    Footer,
  ],
  templateUrl: './adoption-info-page.html',
  styleUrl: './adoption-info-page.scss',
})
export class AdoptionInfoPage {}
