import { Component } from '@angular/core';
import { Auth as AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginModel = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.loginModel).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }
}
