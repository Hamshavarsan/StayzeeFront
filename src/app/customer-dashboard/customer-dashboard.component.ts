import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavbarComponent } from '../features/customer/shared/navbar/navbar';

export interface Property {
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
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  showProfileMenu: boolean = false;

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
  ];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  // ✅ BOOK NOW navigates with query parameter
  bookNow(property: Property): void {
    this.router.navigate(['/booking/create'], { queryParams: { propertyId: property.id } });
  }

  toggleFavorite(property: Property): void {
    property.isFavorite = !property.isFavorite;
  }

  searchProperties(): void {
    console.log('Searching properties...');
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeMenu(): void {
    this.showProfileMenu = false;
  }

  onLogout(event: Event): void {
    event.preventDefault();
    console.log('Logging out...');
  }

  private loadCustomerData(): void {
    this.customerService.getCustomer('123').subscribe({
      next: (customer) => {
        console.log('Customer data:', customer);
      },
      error: (error) => {
        console.error('Error fetching customer data:', error);
      }
    });
  }

  updateCustomerData(customerId: string, data: any): void {
    this.customerService.updateCustomer(customerId, data).subscribe({
      next: (response) => console.log('Update successful', response),
      error: (error) => console.error('Error updating customer:', error)
    });
  }
}
