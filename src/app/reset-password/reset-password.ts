import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  
  username = '';
  code = '';
  newPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const data = {
      username: this.username,
      code: this.code,
      newPassword: this.newPassword
    };

    this.auth.resetPassword(data).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err: any) => alert(err.error)
    });
  }
}
