import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-otp-verification',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './otp-verification.component.html',
    styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent {
    otpCode: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    verify() {
        if (!this.otpCode || this.otpCode.length < 6) {
            this.errorMessage = 'Please enter a valid 6-digit code.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.verify(this.otpCode).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                // Verification successful, redirect to login or home
                // Since we are not logging them in automatically (no token), we redirect to login
                this.router.navigate(['/login'], { queryParams: { verified: 'true' } });
            },
            error: (err: any) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Verification failed. Please check the code and try again.';
            }
        });
    }
}
