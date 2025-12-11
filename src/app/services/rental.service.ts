import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental.model';  

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl = "http://localhost:5079/api/rentals";

  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.baseUrl}/all`);
  }

  // இது owner listing page-க்கு (ஏற்கனவே இருக்கு, வைச்சுக்கோ)
  createRental(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, formData);
  }
  
}
