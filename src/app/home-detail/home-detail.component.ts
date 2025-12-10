import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // இதை add பண்ணு
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],  // RouterModule add ஆகிடுச்சு
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  home: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`${environment.apiUrl}/Rentals/${id}`).subscribe({
        next: (data: any) => this.home = data,
        error: () => console.log('Property not found')
      });
    }
  }

  goBack() {
    window.history.back();
  }
}