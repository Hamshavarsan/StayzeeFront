import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})

export class ForgotPassword {

  username = '';
  email = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const data = {
      username: this.username,
      email: this.email
    };

    this.auth.forgotPassword(data).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/reset-password']);
      },
      error: (err) => alert(err.error)
    });
  }
  

}
