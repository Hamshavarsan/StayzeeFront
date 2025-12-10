import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = environment.apiUrl + '/Booking';

  constructor(private http: HttpClient) {}

  createBooking(booking: any): Observable<any> {
    return this.http.post(`${this.api}/create`, booking);
  }

  getBooking(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  shareBooking(request: { BookingId: string; Emails: string[] }): Observable<any> {
    return this.http.post(`${this.api}/share`, request);
  }
}
