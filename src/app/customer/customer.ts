import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
customer: any = {
    name: '',
    email: '',
    phone: ''
  };

  customerList: any[] = [];

  // Save Customer
  saveCustomer() {
    if (this.customer.name && this.customer.email && this.customer.phone) {

      // Edit Mode
      if (this.editIndex !== null) {
        this.customerList[this.editIndex] = { ...this.customer };
        this.editIndex = null;
      } 
      else {
        // Add New
        this.customerList.push({ ...this.customer });
      }

      this.resetForm();
    }
  }

  editIndex: number | null = null;

  // Edit Customer
  editCustomer(c: any) {
    this.customer = { ...c };
    this.editIndex = this.customerList.indexOf(c);
  }

  // Delete Customer
  deleteCustomer(i: number) {
    this.customerList.splice(i, 1);
  }

  // Reset Form
  resetForm() {
    this.customer = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
