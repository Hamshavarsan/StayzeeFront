import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../services/rental.service';
import { SafeUrlPipe } from "./safe-url.pipe";
import { Router } from '@angular/router';  
@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, SafeUrlPipe],
  templateUrl: './add-property.html',
  styleUrls: ['./add-property.scss']
})
export class AddProperty {
goBack() {
  this.router.navigate(['/admin/settings']); 
  
}
  isDragOver = false;
  isSubmitting = false;
  photos: File[] = [];

  rentalData = {
    userId: 0,  // இப்போ constructor-ல set ஆகும்
    homeTitle: '',
    homeLocation: '',
    bedrooms: 1,
    petFriendly: false,
    oneDayPrice: 0,
    monthPrice: 0,
    currentBill: 0
  };

  constructor(
    private rentalService: RentalService,
    private router: Router
  ) {
    const storedUserId = localStorage.getItem("userId");
    
    if (!storedUserId) {
      alert("Please login first!");
      this.router.navigate(['/login']);
      return;
    }

    this.rentalData.userId = Number(storedUserId);
    
  }

  // Drag & Drop fully working 
  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      this.addPhotos(newFiles);
    }
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  // File select from button
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.addPhotos(newFiles);
      input.value = '';  
    }
  }

  // Common method for both click and drag-drop
  private addPhotos(newFiles: File[]) {
    this.photos.push(...newFiles);

    if (this.photos.length > 10) {
      this.photos = this.photos.slice(0, 10);
      alert("Maximum 10 photos allowed. Extra photos ignored.");
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  onSubmit() {
    if (this.photos.length < 4) {
      alert("Please upload at least 4 photos!");
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const form = new FormData();
    form.append("UserId", this.rentalData.userId.toString());
    form.append("HomeTitle", this.rentalData.homeTitle);
    form.append("HomeLocation", this.rentalData.homeLocation);
    form.append("Bedrooms", this.rentalData.bedrooms.toString());
    form.append("PetFriendly", this.rentalData.petFriendly.toString());
    form.append("OneDayPrice", this.rentalData.oneDayPrice.toString());
    form.append("MonthPrice", this.rentalData.monthPrice.toString());
    form.append("CurrentBill", this.rentalData.currentBill.toString());

    this.photos.forEach((photo) => {
      form.append("Photos", photo);
    });

    this.rentalService.createRental(form).subscribe({
    next: (res: any) => {
      alert("Congratulations! Your property is live. Welcome Host!");
      localStorage.setItem('role', 'Rentals'); 
      this.router.navigate(['/rentalhome']);
      
      
    },
    error: (err) => {
      console.error(err);
      alert("Error: " + (err.error?.message || "Failed to list property"));
      this.isSubmitting = false;
    }
  });
  }

  private resetForm() {
    this.rentalData.homeTitle = '';
    this.rentalData.homeLocation = '';
    this.rentalData.bedrooms = 1;
    this.rentalData.petFriendly = false;
    this.rentalData.oneDayPrice = 0;
    this.rentalData.monthPrice = 0;
    this.rentalData.currentBill = 0;
    this.photos = [];
  }
}