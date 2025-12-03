import { Component } from '@angular/core';

@Component({
  selector: 'app-owner',
  imports: [],
  templateUrl: './owner.html',
  styleUrl: './owner.scss',
})
export class Owner {
owner: any = {
    name: '',
    email: '',
    phone: ''
  };

  ownerList: any[] = [];

  // Save owner
  saveOwner() {
    if (this.owner.name && this.owner.email && this.owner.phone) {

      // Edit Mode
      if (this.editIndex !== null) {
        this.ownerList[this.editIndex] = { ...this.owner };
        this.editIndex = null;
      } 
      else {
        // Add New
        this.ownerList.push({ ...this.owner });
      }

      this.resetForm();
    }
  }

  editIndex: number | null = null;

  // Edit owner
  editOwner(c: any) {
    this.owner = { ...c };
    this.editIndex = this.ownerList.indexOf(c);
  }

  // Delete owner
  deleteOwner(i: number) {
    this.ownerList.splice(i, 1);
  }

  // Reset Form
  resetForm() {
    this.owner = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
