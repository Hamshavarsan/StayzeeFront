import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './customer-dashboard/customer-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'api/customers'; // Replace with your actual API endpoint
  baseUrl: any;

  constructor(private http: HttpClient) { }

  // Example method to get customer data
  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Example method to update customer data
  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  getFavorites(customerId: string) {
  return this.http.get<Property[]>(`${this.baseUrl}/favorites/${customerId}`);
}
addFavorite(favorite: any) {
  return this.http.post(`${this.baseUrl}/favorite`, favorite);
}

}
