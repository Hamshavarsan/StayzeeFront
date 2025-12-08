import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.load(+id); // convert string to number
  }

  load(id: number) {
    this.loading = true;
    this.bookingService.getBookingById(id).subscribe({
      next: res => {
        this.booking = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load booking';
        this.loading = false;
      }
    });
  }

  goToShare() {
    if (this.booking?.id) this.router.navigate(['/booking', this.booking.id, 'share']);
  }
}
