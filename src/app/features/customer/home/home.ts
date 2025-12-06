import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface SearchFilters {
  city: string;
  minBedrooms: number | null;
  maxPrice: number | null;
  propertyType: string;
  rentalType: string;
  amenities: {
    furnished: boolean;
    wifi: boolean;
    petFriendly: boolean;
    parking: boolean;
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1>Get a smooth stay in Sri Lanka...</h1>
        <p class="subtitle">Find your perfect homestay with our curated selection of properties</p>
      </div>

      <div class="search-card">
        <form (ngSubmit)="onSearch()" class="search-form">
          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" [(ngModel)]="filters.city" name="city" placeholder="Enter city">
            </div>
            
            <div class="form-group">
              <label for="minBedrooms">Min Bedrooms</label>
              <input type="number" id="minBedrooms" [(ngModel)]="filters.minBedrooms" name="minBedrooms" min="1" placeholder="Any">
            </div>
            
            <div class="form-group">
              <label for="maxPrice">Max Price ($)</label>
              <input type="number" id="maxPrice" [(ngModel)]="filters.maxPrice" name="maxPrice" min="0" placeholder="No max">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="propertyType">Property Type</label>
              <select id="propertyType" [(ngModel)]="filters.propertyType" name="propertyType">
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="cottage">Cottage</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="rentalType">Rental Type</label>
              <select id="rentalType" [(ngModel)]="filters.rentalType" name="rentalType">
                <option value="">Any Term</option>
                <option value="short">Short Term</option>
                <option value="long">Long Term</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Amenities</label>
              <div class="amenities">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="filters.amenities.furnished" name="furnished">
                  <span>Furnished</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="filters.amenities.wifi" name="wifi">
                  <span>Wi-Fi</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="filters.amenities.petFriendly" name="petFriendly">
                  <span>Pet Friendly</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="filters.amenities.parking" name="parking">
                  <span>Parking</span>
                </label>
              </div>
            </div>
          </div>
          
          <button type="submit" class="search-button">Search</button>
        </form>
      </div>
      
      <div class="illustration">
        <!-- This would be a decorative SVG or image -->
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 8rem 2rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
      max-width: 800px;
    }
    
    h1 {
      font-size: 3rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 700;
      background: linear-gradient(90deg, #F8A1D1, #9C89B8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: #666;
      margin: 0;
    }
    
    .search-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 1000px;
      margin-bottom: 3rem;
    }
    
    .search-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-row {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #444;
    }
    
    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    input[type="text"]:focus,
    input[type="number"]:focus,
    select:focus {
      outline: none;
      border-color: #F8A1D1;
      box-shadow: 0 0 0 3px rgba(248, 161, 209, 0.2);
    }
    
    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: normal;
      cursor: pointer;
    }
    
    .checkbox-label input[type="checkbox"] {
      width: auto;
      margin: 0;
    }
    
    .search-button {
      background: #F8A1D1;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease, transform 0.2s ease;
      align-self: flex-end;
      margin-top: 1rem;
    }
    
    .search-button:hover {
      background: #E891C5;
      transform: translateY(-2px);
    }
    
    .illustration {
      margin-top: 3rem;
      width: 100%;
      height: 300px;
      background: linear-gradient(135deg, #F8E1F4 0%, #E2F0FB 100%);
      border-radius: 16px;
    }
    
    @media (max-width: 768px) {
      .home-container {
        padding: 6rem 1rem 3rem;
      }
      
      h1 {
        font-size: 2.2rem;
      }
      
      .form-group {
        min-width: 100%;
      }
      
      .search-button {
        width: 100%;
      }
    }
  `]
})
export class Home {
  filters: SearchFilters = {
    city: '',
    minBedrooms: null,
    maxPrice: null,
    propertyType: '',
    rentalType: '',
    amenities: {
      furnished: false,
      wifi: false,
      petFriendly: false,
      parking: false
    }
  };

  constructor(private router: Router) {}

  onSearch(): void {
    // Navigate to search results with filters
    this.router.navigate(['/search-results'], { 
      queryParams: { 
        ...this.filters,
        amenities: JSON.stringify(this.filters.amenities)
      } 
    });
  }
}
