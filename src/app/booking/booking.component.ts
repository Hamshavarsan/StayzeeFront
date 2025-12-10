import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from './booking.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  propertyId = '';
  home: any = null;
  days = 0;
  bookingId: string | null = null;
  shareEmails = '';
  shareMessage = '';
  bookingConfirmed = false;
  maxGuests = 10;
  sharedCustomers: string[] = []; // list of added customers

  booking = {
    CustomerId: '',
    HomeId: '',
    CheckInDate: '',
    CheckOutDate: '',
    TotalPrice: 0,
    BookingStatusId: '00000000-0000-0000-0000-000000000000'
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('propertyId') || '';
    this.booking.HomeId = this.propertyId;

    // Get logged-in user from localStorage
    const userData = localStorage.getItem('currentUser') || localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.booking.CustomerId = user.id || user.customerId || user.CustomerId || user.userId || '';
      } catch (e) {
        console.log('User not found in localStorage');
      }
    }

    if (!this.booking.CustomerId) {
      this.booking.CustomerId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // Demo ID
    }

    this.loadHomeDetails();
  }

  loadHomeDetails() {
    this.http.get(`${environment.apiUrl}/Rentals/${this.propertyId}`).subscribe({
      next: (data: any) => this.home = data,
      error: () => this.home = { homeTitle: 'Luxury Stay', oneDayPrice: 3500 }
    });
  }

  calculateDays() {
    if (this.booking.CheckInDate && this.booking.CheckOutDate) {
      const inDate = new Date(this.booking.CheckInDate);
      const outDate = new Date(this.booking.CheckOutDate);
      inDate.setHours(0, 0, 0, 0);
      outDate.setHours(0, 0, 0, 0);

      this.days = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
      this.booking.TotalPrice = this.days > 0 ? this.days * (this.home?.oneDayPrice || 3500) : 0;
    }
  }

  confirmBooking() {
    if (this.days <= 0) return alert('Please select valid check-in and check-out dates');
    if (!this.booking.CustomerId) return alert('Please login first');

    this.bookingService.createBooking(this.booking).subscribe({
      next: (res: any) => {
        this.bookingId = res.bookingId;
        this.bookingConfirmed = true;
        alert('Booking Confirmed Successfully! Booking ID: ' + this.bookingId);
      },
      error: (err: any) => {
        console.error('Booking failed:', err);
        const msg = err.error?.title || err.error || err.message || 'Unknown error';
        alert('Booking Failed: ' + msg);
      }
    });
  }

  shareBooking() {
    if (!this.bookingId) return alert('Please confirm booking first');

    const emails = this.shareEmails.split(',').map(e => e.trim()).filter(Boolean);

    // Check max guests limit
    if (this.sharedCustomers.length + emails.length > this.maxGuests) {
      return alert(`Cannot add more than ${this.maxGuests} customers per booking`);
    }

    if (emails.length === 0) return alert('Enter at least one email');

    this.bookingService.shareBooking({
      BookingId: this.bookingId,
      Emails: emails
    }).subscribe({
      next: () => {
        this.sharedCustomers.push(...emails);
        this.shareMessage = 'Shared successfully!';
        this.shareEmails = '';
      },
      error: (err: any) => {
        const msg = err.error?.title || 'Only registered emails allowed';
        this.shareMessage = msg;
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  proceedToPayment() {
    if (!this.bookingConfirmed) return alert('Please confirm booking first');
    alert('Redirecting to Payment gateway...');
    // Implement actual payment integration here
  }
}
