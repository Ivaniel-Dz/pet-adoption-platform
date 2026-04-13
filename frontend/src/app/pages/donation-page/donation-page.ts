import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';
import { LucideLandmark, LucideWallet, LucideHouseHeart, LucideHandHeart, LucideBone, LucideCircleCheckBig } from '@lucide/angular'

@Component({
  selector: 'app-donation-page',
  imports: [
    Navigation,
    LucideCircleCheckBig,
    LucideLandmark,
    LucideWallet,
    LucideHouseHeart,
    LucideHandHeart,
    LucideBone,
    Footer,
  ],
  templateUrl: './donation-page.html',
  styleUrl: './donation-page.scss',
})
export class DonationPage {}
