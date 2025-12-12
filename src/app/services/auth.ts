import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../core/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/login`, data);
  }
}
