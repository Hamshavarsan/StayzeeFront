// src/app/features/booking/create-booking/create-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  // BookingRequestDto for sending to API
  booking: BookingRequestDto = {
    customerId: 0,
    homeId: 0,
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0,
    bookingId: undefined
  };

  loading = false;
  success = '';
  error = '';

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Prefill homeId from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['propertyId']) {
        this.booking.homeId = +params['propertyId']; // ensure number type
      }
    });
  }

  submit(): void {
    this.error = '';
    this.success = '';

    // Basic form validation
    if (!this.booking.customerId || !this.booking.homeId || !this.booking.checkInDate || !this.booking.checkOutDate) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;

    // Call BookingService to create booking
    this.bookingService.createBooking(this.booking).subscribe({
      next: (res: Booking) => {
        this.success = `Booking created. ID: ${res.id}`;
        this.loading = false;
        // Navigate to booking details page
        this.router.navigate(['/booking', res.id]);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Create booking failed';
        this.loading = false;
      }
    });
  }
}

// BookingRequestDto interface
export interface BookingRequestDto {
  bookingId: any;
  customerId: number;
  homeId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}
