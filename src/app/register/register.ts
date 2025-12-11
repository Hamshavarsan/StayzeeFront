import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  registerData: any = {
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    NICOrPassport: '',
    password: '',
    role: 'Customer'
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    if (!this.registerData.username || !this.registerData.password || !this.registerData.email) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (res: any) => {
        // Save token and user details usually happens on login, 
        // but if register auto-logs in, we save it here.
        // Registration successful
        // We do NOT log them in automatically anymore.
        // Instead, we redirect to OTP verification page.

        // You might want to pass the email or show a success message toast here
        this.router.navigate(['/otp-verify']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
