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
export class Login {

  loginData: any = {
    Username: '',
    Password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        if (res.role === "Customer") {
          this.router.navigate(['/home']);
        }
        else if (res.role === "Admin") {
          this.router.navigate(['/admin-dashboard']);
        }
        else if (res.role === "Rentals") {
          this.router.navigate(['/rentals-dashboard']);
        }
      },
      error: (err: any) => {
        // API message eduthukkura place
        const msg = err.error?.message || "Login failed!";
        alert(msg);
        this.errorMessage = msg;
      }
    });
  }

}
