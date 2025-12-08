// create-rental.component.ts → FINAL VERSION
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-rental',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-rental.html',
  styleUrls: ['./create-rental.scss']
})
export class CreateRental implements OnInit {
  rentalForm!: FormGroup;
  selectedPhotos: File[] = [];   // Correct
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  userId: number = Number(localStorage.getItem('userId')) || 1;
  private apiUrl = 'http://localhost:5079/api/rentals/create';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  // IDHU MUST DA MACHI! implements OnInit ku idhu venaum!
  ngOnInit(): void {
    this.rentalForm = this.fb.group({
      accountNumber: ['', Validators.required],
      homeLocation: ['', Validators.required],
      oneDayPrice: [0, [Validators.required, Validators.min(1)]],
      currentBill: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files as FileList;  // ← Type assertion add pannu
  
    if (files && files.length >= 4) {
      this.selectedPhotos = Array.from(files).slice(0, 10);
      this.errorMessage = '';
    } else if (files && files.length > 0) {
      this.errorMessage = 'Please select at least 4 photos!';
    }
  }
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.rentalForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly!';
      return;
    }

    if (this.selectedPhotos.length < 4) {
      this.errorMessage = 'Minimum 4 photos required!';
      return;
    }

    if (this.isSubmitting) return; // prevent double click
    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('UserId', this.userId.toString());
    formData.append('AccountNumber', this.rentalForm.get('accountNumber')?.value.trim());
    formData.append('HomeLocation', this.rentalForm.get('homeLocation')?.value.trim());
    formData.append('OneDayPrice', this.rentalForm.get('oneDayPrice')?.value);
    formData.append('CurrentBill', this.rentalForm.get('currentBill')?.value);

    this.selectedPhotos.forEach((photo, index) => {
      formData.append('Photos', photo, `home-photo-${index + 1}.jpg`);
    });

    this.http.post(this.apiUrl, formData).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Your home is live! Welcome to Rentals Club!';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed! Check internet or try again.';
        this.isSubmitting = false;
      }
    });
  }
}