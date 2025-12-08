import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  getAll(arg0: {}) {
    throw new Error('Method not implemented.');
  }

  private api = environment.apiUrl + '/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<any> {
    return this.http.get(this.api);
  }

  searchProperties(params: any): Observable<any> {
    return this.http.get(this.api, { params });
  }
}
