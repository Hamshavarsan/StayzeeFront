import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
currentYear: any;
  closeMenu() {
    throw new Error('Method not implemented.');
  }
  toggleProfileMenu() {
    throw new Error('Method not implemented.');
  }

  rentals: any[] = [];

  // Search properties
  searchCity: string = '';
  searchMinBedrooms: number | null = null;
  searchMaxPrice: number | null = null;

  // UX states
  isLoading: boolean = false;
  noResults: boolean = false;
  searchPerformed: boolean = false;

  // Debounce search
  private searchSubject = new Subject<string>();

  constructor(
    private rentalService: RentalService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAllRentals();

    // Set up auto-search with debounce
    this.searchSubject.pipe(
      debounceTime(500), // Wait 500ms after user stops typing
      distinctUntilChanged() // Only emit if value changed
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  loadAllRentals() {
    this.isLoading = true;
    this.searchPerformed = false;
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.isLoading = false;
        console.log('Rentals loaded:', data);
      },
      error: (err) => {
        console.error('Error loading rentals:', err);
        this.isLoading = false;
      }
    });
  }

  // Called when user types in search box
  onSearchInput() {
    this.searchSubject.next(this.searchCity);
  }

  // Manual search (button click)
  onSearch() {
    this.performSearch(this.searchCity);
  }

  // Actual search logic
  private performSearch(city: string) {
    if (city && city.trim()) {
      this.isLoading = true;
      this.noResults = false;
      this.searchPerformed = true;

      this.rentalService.searchRentalsByCity(city).subscribe({
        next: (data) => {
          this.rentals = data;
          this.noResults = data.length === 0;
          this.isLoading = false;
          console.log('Search results for', city, ':', data);
        },
        error: (err) => {
          console.error('Search error:', err);
          this.rentals = [];
          this.noResults = true;
          this.isLoading = false;
        }
      });
    } else {
      // Empty search - load all rentals
      this.loadAllRentals();
    }
  }

  // Clear search
  clearSearch() {
    this.searchCity = '';
    this.searchMinBedrooms = null;
    this.searchMaxPrice = null;
    this.noResults = false;
    this.searchPerformed = false;
    this.loadAllRentals();
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

  bookNow(rentalId: number) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const userId = this.authService.getUserId();
    this.router.navigate(['/booking', rentalId]);
  }
}
