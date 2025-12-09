import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login  {  // class name-யும் மாத்திட்டேன் (best practice)

  loginData = {
    Username: '',
    Password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.loginData.Username || !this.loginData.Password) {
      this.errorMessage = 'Please fill both fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        // இதுதான் மிக முக்கியம் – userId ஐ கண்டிப்பா save பண்ணு!
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());  // இதை miss பண்ணாதே!
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username || res.Username);

        // Role-based routing
        if (res.role === 'Customer') {
          this.router.navigate(['/home']);
        } else if (res.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (res.role === 'Rentals') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']); // default home
        }
      },
      error: (err: any) => {
        const msg = err.error?.message || 'Login failed! Check username/password';
        this.errorMessage = msg;
        alert(msg);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}