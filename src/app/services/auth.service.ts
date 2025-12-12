import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiUrl = "http://localhost:5079/api/Auth";

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  verify(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify?code=${code}`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }
  getUserId(): number | null {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return user?.id || null;
  }
//   isLoggedIn(): boolean {
//   return localStorage.getItem('token') != null;
// }

// getCurrentUserId(): number {
//   return +localStorage.getItem('userId'); // login பண்ணும்போது save பண்ணிரு
// }
}
