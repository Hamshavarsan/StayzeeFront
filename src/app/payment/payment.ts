import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {
  email: string = '';
  amount: number = 0;
  description = 'Sunny Villa booking (2 nights)';

  constructor(private paymentService: PaymentService) {}

  // payNow() {
  //   this.paymentService.createCheckout(this.amount, this.email, this.description).subscribe({
  //     next: (res: any) => {
  //       window.location.href = res.url; // Redirect to Stripe Checkout
  //     },
  //     error: err => { alert('Failed to create checkout session.'); }
  //   });
  // }
  
}
