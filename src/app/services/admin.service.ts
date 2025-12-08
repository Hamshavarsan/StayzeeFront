import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get(`${API_BASE_URL}/Admin/users`);
    }

    blockUser(id: number): Observable<any> {
        return this.http.post(`${API_BASE_URL}/Admin/users/${id}/block`, {});
    }

    unblockUser(id: number): Observable<any> {
        return this.http.post(`${API_BASE_URL}/Admin/users/${id}/unblock`, {});
    }

    getPendingHomes(): Observable<any> {
        return this.http.get(`${API_BASE_URL}/Admin/homes/pending`);
    }

    approveHome(id: string): Observable<any> {
        return this.http.post(`${API_BASE_URL}/Admin/homes/${id}/approve`, {});
    }

    rejectHome(id: string): Observable<any> {
        return this.http.post(`${API_BASE_URL}/Admin/homes/${id}/reject`, {});
    }

    getAllCustomers(): Observable<any> {
        return this.http.get(`${API_BASE_URL}/Admin/customers`);
    }

    getAllRentals(): Observable<any> {
        return this.http.get(`${API_BASE_URL}/Admin/rentals`);
    }
}
