import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private authService: AuthService, private router: Router) {}

 onRegister() {
  this.authService.register(this.registerData).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId.toString());   // இங்கயும் வரும்!
      localStorage.setItem('role', res.role);
      localStorage.setItem('username', res.username);

       
      if (res.role === 'Customer') {
        this.router.navigate(['/home']);
      }
    },
    error: (err) => {
      alert(err.error.message || 'Registration failed');
    }
  });
}
}
