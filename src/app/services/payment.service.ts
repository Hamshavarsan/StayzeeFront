import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private api = 'https://localhost:7012/api'; // change to your backend URL and port

  constructor(private http: HttpClient) {}

  createCheckout(amount: number, email: string, description?: string) {
    return this.http.post<{ url: string, sessionId: string }>(`${this.api}/payment/create-checkout-session`, {
      amount,
      customerEmail: email,
      description
    });
  }

  getInvoice(sessionId: string) {
    return this.http.get(`${this.api}/invoice/${sessionId}`, { responseType: 'blob' });
  }
}
