import { Component } from '@angular/core';
import { LucideClock, LucideMail, LucideMapPin, LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-contact-section',
  imports: [LucideMail, LucidePhone, LucideClock, LucideMapPin],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {}
