import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShareDialogComponent } from '../share-dialog/share-dialog';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatDatepickerModule, MatInputModule,
    MatCardModule, MatIconModule, MatDialogModule
  ],
  templateUrl: './booking-page.html',
  styleUrls: ['./booking-page.scss']
})
export class BookingPage implements OnInit {
  rental: any;
  startDate: Date | null = null;
  endDate: Date | null = null;
  total = 0;
  loading = false;
  //titleService: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog,
    private titleService: Title 
  ) {}
 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (!id) return;

    this.api.getRental(+id).subscribe({
      next: (data) => {
        this.rental = data;
        this.titleService.setTitle(`${data.homeTitle} - StayZee.com`);
      }
    });
  });
}

  calculateTotal() {
    if (!this.startDate || !this.endDate || !this.rental) return;
    const days = Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    let basePrice = 0;
    if (days >= 30) {
      const months = Math.floor(days / 30);
      const extra = days % 30;
      basePrice = months * this.rental.monthPrice + extra * this.rental.oneDayPrice;
    } else {
      basePrice = days * this.rental.oneDayPrice;
    }
    this.total = Math.round(basePrice * 1.15);
  }

  bookNow() {
    if (!this.startDate || !this.endDate) return alert('Select dates');

    this.loading = true;
    this.api.bookRental({
      rentalId: this.rental.id,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString()
    }).subscribe({
      next: (res) => {
        alert(`Booking Success! Pay LKR ${res.totalAmount}`);
        // redirect to payment page
      },
      error: (err) => {
        alert(err.error || 'Dates not available');
        this.loading = false;
      }
    });
  }

  openShareDialog() {
    this.dialog.open(ShareDialogComponent, {
      width: '400px',
      data: { rentalId: this.rental.id }
    });
  }
}