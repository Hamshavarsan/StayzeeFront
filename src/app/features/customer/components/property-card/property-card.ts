import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  isFavorite: boolean;
  amenities: {
    wifi: boolean;
    parking: boolean;
    airConditioning: boolean;
    pool: boolean;
  };
}

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-card.html',
  styleUrls: ['./property-card.scss']
})
export class PropertyCardComponent {
  constructor(private auth: AuthService, private router: Router) {}

  @Input() property!: Property;

  @Output() favoriteToggled = new EventEmitter<string>();

  toggleFavorite(): void {
    this.property.isFavorite = !this.property.isFavorite;
    this.favoriteToggled.emit(this.property.id);
  }

  onBookNow(): void {
    console.log('Booking property:', this.property.id);
  }
}
