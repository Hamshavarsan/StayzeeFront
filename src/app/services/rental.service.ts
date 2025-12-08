import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = "http://localhost:5079/api/rentals/create";

  constructor(private http: HttpClient) {}

  createRental(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
