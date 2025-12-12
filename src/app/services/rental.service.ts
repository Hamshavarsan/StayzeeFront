import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface inside service file only (no separate model file)
export interface Rental {
  id: number;
  homeTitle: string;
  homeLocation: string;
  bedrooms: number;
  petFriendly: boolean;
  oneDayPrice: number;
  monthPrice: number;
  photoUrls: string[];
}

export interface BookingRequest {
  rentalId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl = "http://localhost:5079/api/rentals"; // Your backend port

  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.baseUrl}/all`);
  }

  // For owner (if needed later)
  createRental(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, formData);
  }

  // Booking API
  bookRental(request: BookingRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/book`, request);
  }
}