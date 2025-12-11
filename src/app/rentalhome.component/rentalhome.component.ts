import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { RentalService } from '../services/rental.service';
import { AuthService } from '../services/auth.service';
import { ViewerComponent } from '../viewer.component/viewer.component';
import { Rental } from '../models/rental.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './rentalhome.component.html',
  styleUrls: ['./rentalhome.component.scss']
})
export class RentalHomeComponent implements OnInit {
closeMenu() {
throw new Error('Method not implemented.');
}
toggleProfileMenu() {
throw new Error('Method not implemented.');
}
// getDescription(_t24: any) {
// throw new Error('Method not implemented.');
// }
// getPropertyType(_t24: any) {
// throw new Error('Method not implemented.');
// }
// onImgError($event: ErrorEvent) {
// throw new Error('Method not implemented.');
// }
bookNow(arg0: any) {
throw new Error('Method not implemented.');
}

  rentals: any[] = [];

  constructor(
    private rentalService: RentalService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        console.log('Rentals loaded:', data);
      },
      error: (err) => {
        console.error('Error loading rentals:', err);
      }
    });
  }

  openPhotoGallery(photos: string[]) {
    this.dialog.open(ViewerComponent, {
      data: { photos },
      width: '95vw',
      height: '95vh',
      maxWidth: '95vw',
      maxHeight: '95vh',
      panelClass: 'photo-dialog'
    });
  }
    getPropertyType(r: Rental): string {
    const types = [];
    if (r.bedrooms >= 4) types.push('Villa');
    else if (r.bedrooms >= 3) types.push('House');
    else types.push('Apartment');
    return types[0] || 'Homestay';
  }

  getDescription(r: Rental): string {
    if (r.homeTitle.toLowerCase().includes('beach')) return 'Stunning beachfront property with ocean view';
    if (r.homeTitle.toLowerCase().includes('luxury')) return 'Beautiful villa with modern amenities and private pool';
    if (r.homeLocation.includes('Kandy')) return 'Comfortable apartment in the heart of the city';
    return 'Cozy and well-maintained stay with all facilities';
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/400x300/eee/aaa?text=No+Image';
  }

  // bookNow(rentalId: number) {
  //   if (!this.authService.isLoggedIn()) {
  //     this.router.navigate(['/login']);
  //     return;
  //   }
  //   const userId = this.authService.getUserId();
  //   this.router.navigate(['/booking'], {
  //     queryParams: { rentalId, userId }
  //   });
  // }
}