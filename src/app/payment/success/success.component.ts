import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  sessionId: string | null = null;
  invoiceUrl: string | null = null;
  invoiceReady = false;
  checking = true;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      // Try to fetch invoice (webhook might take a moment). We'll poll a few times.
      this.tryFetchInvoice(0);
    } else {
      this.checking = false;
    }
  }

  tryFetchInvoice(attempt: number) {
    this.paymentService.getInvoice(this.sessionId!).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.invoiceUrl = url;
        this.invoiceReady = true;
        this.checking = false;
      },
      error: () => {
        if (attempt < 6) {
          setTimeout(() => this.tryFetchInvoice(attempt + 1), 1500); // retry after 1.5s
        } else {
          this.checking = false;
        }
      }
    });
  }
}
