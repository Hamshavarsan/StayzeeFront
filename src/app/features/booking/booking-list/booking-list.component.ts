import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  loading = false;
  error = '';

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: res => {
        this.bookings = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load bookings';
        this.loading = false;
      }
    });
  }

  open(id: string) {
    this.router.navigate(['/booking', id]);
  }

  share(id: string) {
    this.router.navigate(['/booking', id, 'share']);
  }
}
