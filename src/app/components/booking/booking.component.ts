import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService, Rental } from '../../services/rental.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  rental: Rental | null = null;
  mainImage: string | null = null;
  loading = true;
  checkIn = '';
  checkOut = '';
  errorMessage = ''; // For validation messages

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('propertyId') || this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      alert('No property selected!');
      this.router.navigate(['/customers']);
      return;
    }

    const propertyId = +idParam;
    this.loadProperty(propertyId);
  }

  loadProperty(id: number) {
    this.rentalService.getAllRentals().subscribe({
      next: (rentals) => {
        this.rental = rentals.find(r => r.id === id) ?? null;
        if (this.rental && this.rental.photoUrls.length > 0) {
          this.mainImage = this.rental.photoUrls[0];
        }
        this.loading = false;
        if (!this.rental) {
          alert(`Property with ID ${id} not found!`);
          this.router.navigate(['/customers']);
        }
      },
      error: (err) => {
        console.error('Error loading rentals:', err);
        this.loading = false;
        alert('Failed to load property details');
      }
    });
  }

  changeMainImage(url: string) {
    this.mainImage = url;
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get nextDay(): string {
    if (!this.checkIn) return this.today;
    const next = new Date(this.checkIn);
    next.setDate(next.getDate() + 1);
    return next.toISOString().split('T')[0];
  }

  get nights(): number {
    if (!this.checkIn || !this.checkOut) return 0;
    const inDate = new Date(this.checkIn);
    const outDate = new Date(this.checkOut);
    if (outDate <= inDate) return 0;
    const diff = outDate.getTime() - inDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get totalPrice(): number {
    return this.nights * (this.rental?.oneDayPrice || 0);
  }

  confirmBooking() {
    // Validation
    if (!this.rental) return;

    if (!this.checkIn || !this.checkOut) {
      this.errorMessage = 'Please select both check-in and check-out dates';
      return;
    }

    if (this.nights <= 0) {
      this.errorMessage = 'Check-out must be after check-in';
      return;
    }

    this.errorMessage = '';
    alert(
      `Booking Confirmed!\n\n` +
      `Property: ${this.rental.homeTitle}\n` +
      `Location: ${this.rental.homeLocation}\n` +
      `Dates: ${this.checkIn} to ${this.checkOut} (${this.nights} nights)\n` +
      `Total Amount: ₹${this.totalPrice}`
    );
  }
}
