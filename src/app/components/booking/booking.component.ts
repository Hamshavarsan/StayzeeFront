import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RentalService, Rental, BookingRequest } from '../../services/rental.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  rentals: Rental[] = [];
  loading = true;

  // For selected property booking
  selectedRental: Rental | null = null;
  checkIn = '';
  checkOut = '';

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.loading = false;
      },
      error: () => {
        alert('Properties load ஆகல!');
        this.loading = false;
      }
    });
  }

  selectForBooking(rental: Rental) {
    this.selectedRental = rental;
    this.checkIn = '';
    this.checkOut = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get nights(): number {
    if (!this.checkIn || !this.checkOut || !this.selectedRental) return 0;
    const inDate = new Date(this.checkIn);
    const outDate = new Date(this.checkOut);
    if (outDate <= inDate) return 0;
    return Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  get totalPrice(): number {
    return this.nights * (this.selectedRental?.oneDayPrice || 0);
  }

  confirmBooking() {
    if (!this.selectedRental || this.nights <= 0) {
      alert('Valid dates select pannu da!');
      return;
    }

    const userId = 123; // Replace with actual logged-in user ID (from auth)

    const request: BookingRequest = {
      rentalId: this.selectedRental.id,
      userId: userId,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      totalPrice: this.totalPrice
    };

    this.rentalService.bookRental(request).subscribe({
      next: () => {
        alert(`Booking Success! ₹${this.totalPrice} paid for ${this.nights} nights`);
        this.selectedRental = null;
      },
      error: (err) => {
        alert('Booking failed: ' + (err.error?.message || 'Try again'));
      }
    });
  }

  cancelSelection() {
    this.selectedRental = null;
  }
}