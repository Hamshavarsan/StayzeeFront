import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Booking type directly inside service (NO separate file needed)
export interface Booking {
  id?: number;             // Previously you tried to use 'bookingId'
  customerId: number;
  homeId: number;
  homeName?: string;       // optional, if your API sends home name
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status?: string;
  sharedEmails?: string[]; // optional array for shared emails
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly apiUrl = 'https://localhost:7135/api/booking';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/create`, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/list`);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking);
  }

  shareBooking(id: number, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/share`, { email });
  }
}
