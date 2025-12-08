import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';

// ✅ DTO for sharing
interface BookingShareRequestDto {
  bookingId: string;
  emails: string[];
}

@Component({
  selector: 'app-share-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './share-booking.component.html',
  styleUrls: ['./share-booking.component.scss']
})
export class ShareBookingComponent {
  bookingId = '';
  emailsText = ''; // comma-separated input
  loading = false;
  success = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.bookingId = id;
  }

  submitShare() {
    this.error = '';
    this.success = '';

    if (!this.bookingId) {
      this.error = 'Booking id missing';
      return;
    }

    const emails = this.emailsText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (emails.length === 0) {
      this.error = 'Provide at least one email';
      return;
    }

    this.loading = true;
    Promise.all(
      emails.map(email => this.bookingService.shareBooking(+this.bookingId, email).toPromise())
    )
      .then(() => {
        this.success = 'Booking shared successfully';
        this.loading = false;
        this.router.navigate(['/booking', this.bookingId]);
      })
      .catch(err => {
        this.error = err?.error?.message || 'Share failed';
        this.loading = false;
      });
  }
}
