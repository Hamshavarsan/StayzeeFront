 
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ← CommonModule add pannu *ngIf ku
  templateUrl: './add-property.html',
  styleUrls: ['./add-property.scss']
})
export class AddProperty {
  selectedPhotos: number = 0;    // ← count show pannurathuku
  isSubmitting = false;          // ← loading state

  rentalData = {
    userId: Number(localStorage.getItem("userId")) || 1,
    accountNumber: '',
    homeTitle: '',
    homeLocation: '',
    bedrooms: 0,
    petFriendly: false,
    oneDayPrice: 0,
    monthPrice: 0,
    currentBill: 0
  };

  photos: File[] = [];

  constructor(private rentalService: RentalService) {}

  onFileSelect(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.photos = Array.from(files);
      this.selectedPhotos = this.photos.length;
    }
  }

  onSubmit() {
    if (this.photos.length < 4) {
      alert("Please upload minimum 4 photos!");
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const form = new FormData();
    form.append("UserId", this.rentalData.userId.toString());
    form.append("AccountNumber", this.rentalData.accountNumber);
    form.append("HomeName", this.rentalData.homeTitle);
    form.append("HomeLocation", this.rentalData.homeLocation);
    form.append("Bedrooms", this.rentalData.bedrooms.toString());
    form.append("PetFriendly", this.rentalData.petFriendly.toString());
    form.append("OneDayPrice", this.rentalData.oneDayPrice.toString());
    form.append("MonthPrice", this.rentalData.monthPrice.toString());
    form.append("CurrentBill", this.rentalData.currentBill.toString());

    this.photos.forEach((file) => form.append("Photos", file));

    this.rentalService.createRental(form).subscribe({
      next: (res) => {
        alert("Home Created Successfully! Welcome to Rentals Club!");
        this.isSubmitting = false;
        // Optional: redirect
        // this.router.navigate(['/my-listings']);
      },
      error: (err) => {
        alert("Error: " + (err.error?.message || "Something went wrong!"));
        this.isSubmitting = false;
      }
    });
  }
}