import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'; // Fixed import path
import { PropertyService } from '../services/property.service';

interface Property {
  id: number;
  title: string;
  city: string;
  bedrooms: number;
  type: string;
  description: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  properties: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa with Pool',
    city: 'Colombo',
    bedrooms: 3,
    type: 'Villa',
    description: 'Beautiful villa with modern amenities and private pool',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Cozy Apartment',
    city: 'Kandy',
    bedrooms: 2,
    type: 'Apartment',
    description: 'Comfortable apartment in the heart of the city',
    price: 600,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Beachfront Homestay',
    city: 'Galle',
    bedrooms: 4,
    type: 'Homestay',
    description: 'Stunning beachfront property with ocean view',
    price: 950,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Modern Boarding House',
    city: 'Negombo',
    bedrooms: 1,
    type: 'Boarding Place',
    description: 'Affordable and comfortable boarding near the airport',
    price: 300,
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Hillside Cottage',
    city: 'Nuwara Eliya',
    bedrooms: 2,
    type: 'Cottage',
    description: 'Charming cottage with mountain views',
    price: 450,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=500',
    isFavorite: false
  },
  {
    id: 6,
    title: 'City Center Apartment',
    city: 'Colombo',
    bedrooms: 2,
    type: 'Apartment',
    description: 'Modern apartment with all amenities',
    price: 700,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500',
    isFavorite: false
  }
    // ... your existing properties array
  ];
  

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    // Load customer data when component initializes
    this.loadCustomerData();
  }

  toggleFavorite(property: Property): void {
    property.isFavorite = !property.isFavorite;
  }

  searchProperties(): void {
    console.log('Searching properties...');
  }

  // New method to handle customer data loading
  private loadCustomerData(): void {
    // Get customer data
    this.customerService.getCustomer('123').subscribe({
      next: (customer) => {
        console.log('Customer data:', customer);
        // Handle customer data here
      },
      error: (error) => {
        console.error('Error fetching customer data:', error);
      }
    });
  }

  // Example method to update customer data
  updateCustomerData(customerId: string, data: any): void {
    this.customerService.updateCustomer(customerId, data).subscribe({
      next: (response) => {
        console.log('Update successful', response);
        // Handle successful update
      },
      error: (error) => {
        console.error('Error updating customer:', error);
      }
    });
  }
}