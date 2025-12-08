import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'api/customers'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Example method to get customer data
  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Example method to update customer data
  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Add more service methods as needed
}
