import { Component } from '@angular/core';
import { Navigation } from '../../layouts/navigation/navigation';
import { Footer } from '../../layouts/footer/footer';
import { LucideBadgeCheck, LucideLandmark, LucideWallet, LucideHouseHeart, LucideHandHeart, LucideBone } from '@lucide/angular'

@Component({
  selector: 'app-donation-page',
  imports: [
    Navigation,
    LucideBadgeCheck,
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
