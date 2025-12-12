import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing-component.html',
  styleUrls: ['./landing-component.scss']
})
export class LandingComponent {

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/home']); // change route if needed
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
}
