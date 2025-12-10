import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavbarComponent } from '../features/customer/shared/navbar/navbar';
import { PropertyService } from '../services/property.service';

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

  properties: Property[] = [];


  
  searchFilters = {
    city: '',
    minBedrooms: null,
    maxPrice: null,
    type: '',
    duration: ''
  };

  constructor(
    private customerService: CustomerService,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomerData();
    this.loadProperties();

  }
  loadProperties() {
    this.propertyService.getAllProperties().subscribe({
      next: (data: Property[]) => {
        this.properties = data;
      },
      error: (err: any) => console.error('Error loading properties', err)
    });
  }

  // ✅ BOOK NOW navigates with query parameter
  bookNow(property: Property): void {
    this.router.navigate(['/booking/:propertyId'], { queryParams: { propertyId: property.id } });
  }

  toggleFavorite(property: Property): void {
    property.isFavorite = !property.isFavorite;
    const customerId = '123'; // Logic to get current user ID needed

    const favoriteRequest = {
      customerId: customerId,
      propertyId: property.id
    };
    this.customerService.addFavorite(favoriteRequest).subscribe({
      next: (res: any) => console.log('Favorite updated', res),
      error: (err: any) => {
        console.error('Error updating favorite', err);
        // Revert on error
        property.isFavorite = !property.isFavorite;
      }
  });
  }
  loadFavorites() {
    const customerId = '123';   
  
    this.customerService.getFavorites(customerId).subscribe({
      next: data => {
        this.properties = data;
      },
      error: err => console.log(err)
    });
  }
  

  searchProperties(): void {
    console.log('Searching properties...');
    this.propertyService.searchProperties(this.searchFilters).subscribe({
      next: (data: Property[]) => {
        this.properties = data;
      },
      error: (err: any) => console.error('Error searching properties', err)
    });
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
