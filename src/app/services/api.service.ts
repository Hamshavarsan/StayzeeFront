import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5079/api';

  constructor(private http: HttpClient) {}

  getRental(id: number) {
    return this.http.get<any>(`${this.baseUrl}/rentals/${id}`);
  }

  bookRental(data: any) {
    return this.http.post<any>(`${this.baseUrl}/rental/book`, data);
  }

  searchUser(query: string) {
    return this.http.get<any[]>(`${this.baseUrl}/user/search?query=${query}`);
  }

  shareRental(data: { rentalId: number; toUserId: string }) {
    return this.http.post(`${this.baseUrl}/rental/share`, data);
  }
}
