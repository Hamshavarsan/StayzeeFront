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

    this.authService.register(this.registerData).subscribe(res => {

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "Customer") {
        this.router.navigate(['/home']);
      } 
      // else if (res.role === "Admin") {
      //   this.router.navigate(['/admin-dashboard']);
      // }
      // else if (res.role === "Rentals") {
      //   this.router.navigate(['/rentals-dashboard']);
      // }
    });
  }
}
