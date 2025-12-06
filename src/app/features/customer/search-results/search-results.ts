import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Property, PropertyCardComponent } from '../components/property-card/property-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, RouterLink, FormsModule],
  template: `
    <div class="search-results-container">
      <div class="filters-sidebar">
        <h3>Filters</h3>
        
        <div class="filter-group">
          <label for="sort">Sort By</label>
          <select id="sort" [(ngModel)]="sortBy" (change)="applyFilters()" class="filter-select">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
        
        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="price-range">
            <input type="number" [(ngModel)]="priceRange.min" placeholder="Min" (change)="applyFilters()">
            <span>to</span>
            <input type="number" [(ngModel)]="priceRange.max" placeholder="Max" (change)="applyFilters()">
          </div>
        </div>
        
        <div class="filter-group">
          <h4>Amenities</h4>
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="amenities.wifi" (change)="applyFilters()">
            <span>Wi-Fi</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="amenities.parking" (change)="applyFilters()">
            <span>Parking</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="amenities.airConditioning" (change)="applyFilters()">
            <span>Air Conditioning</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="amenities.pool" (change)="applyFilters()">
            <span>Swimming Pool</span>
          </label>
        </div>
        
        <button class="reset-filters" (click)="resetFilters()">Reset Filters</button>
      </div>
      
      <div class="results-main">
        <div class="results-header">
          <h2>{{ filteredProperties.length }} properties found</h2>
          <div class="view-options">
            <button [class.active]="viewMode === 'grid'" (click)="setViewMode('grid')" aria-label="Grid view">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button [class.active]="viewMode === 'list'" (click)="setViewMode('list')" aria-label="List view">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="property-grid" [class.list-view]="viewMode === 'list'">
          <ng-container *ngFor="let property of filteredProperties">
            <app-property-card [property]="property" (favoriteToggled)="onFavoriteToggled($event)"></app-property-card>
          </ng-container>
        </div>
        
        <div *ngIf="filteredProperties.length === 0" class="no-results">
          <h3>No properties match your search criteria</h3>
          <p>Try adjusting your filters or search again</p>
          <button class="back-button" routerLink="/">Back to Home</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results-container {
      display: flex;
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      gap: 2rem;
    }
    
    .filters-sidebar {
      width: 280px;
      flex-shrink: 0;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      height: fit-content;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .filters-sidebar h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #333;
      font-size: 1.25rem;
    }
    
    .filter-group {
      margin-bottom: 1.5rem;
    }
    
    .filter-group h4 {
      margin: 0 0 0.75rem;
      font-size: 0.95rem;
      color: #555;
    }
    
    .filter-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      background-color: white;
      margin-bottom: 1rem;
    }
    
    .price-range {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .price-range input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      text-align: center;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: #555;
    }
    
    .checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: #F8A1D1;
    }
    
    .reset-filters {
      width: 100%;
      padding: 0.75rem;
      background: #f5f5f5;
      border: 1px solid #eee;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .reset-filters:hover {
      background: #eee;
    }
    
    .results-main {
      flex: 1;
    }
    
    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .results-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    
    .view-options {
      display: flex;
      gap: 0.5rem;
      background: #f9f9f9;
      padding: 0.25rem;
      border-radius: 8px;
    }
    
    .view-options button {
      background: none;
      border: none;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      color: #999;
      transition: all 0.2s ease;
    }
    
    .view-options button:hover {
      background: #f0f0f0;
      color: #666;
    }
    
    .view-options button.active {
      background: white;
      color: #F8A1D1;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .property-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .property-grid.list-view {
      grid-template-columns: 1fr;
    }
    
    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .no-results h3 {
      color: #333;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    
    .no-results p {
      color: #666;
      margin-bottom: 1.5rem;
    }
    
    .back-button {
      background: #F8A1D1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .back-button:hover {
      background: #E891C5;
      transform: translateY(-2px);
    }
    
    @media (max-width: 1024px) {
      .search-results-container {
        flex-direction: column;
      }
      
      .filters-sidebar {
        width: 100%;
      }
      
      .property-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }
    
    @media (max-width: 768px) {
      .search-results-container {
        padding: 0 1rem;
      }
      
      .property-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'popularity';
  priceRange = { min: null as number | null, max: null as number | null };
  amenities = {
    wifi: false,
    parking: false,
    airConditioning: false,
    pool: false
  };
  
  // Mock data - in a real app, this would come from a service
  properties: Property[] = [
    {
      id: '1',
      title: 'Modern Apartment in Colombo',
      description: 'Beautiful modern apartment in the heart of Colombo with great views of the city.',
      price: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Colombo 03',
      bedrooms: 2,
      bathrooms: 2,
      isFavorite: false,
      amenities: {
        wifi: true,
        parking: true,
        airConditioning: true,
        pool: false
      }
    },
    // Add more properties as needed
  ];
  
  filteredProperties: Property[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Get query params from URL
    this.route.queryParams.subscribe(params => {
      if (params['city']) {
        // Apply search filters from URL
        this.applyFilters();
      } else {
        // If no search params, show all properties
        this.filteredProperties = [...this.properties];
      }
    });
  }
  
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
  
  applyFilters(): void {
    // In a real app, this would call a service with the filter parameters
    // For now, we'll just filter the mock data
    this.filteredProperties = this.properties.filter(property => {
      // Filter by price range
      if (this.priceRange.min && property.price < this.priceRange.min) return false;
      if (this.priceRange.max && property.price > this.priceRange.max) return false;
      
      // Filter by amenities
      if (this.amenities.wifi && !property.amenities.wifi) return false;
      if (this.amenities.parking && !property.amenities.parking) return false;
      if (this.amenities.airConditioning && !property.amenities.airConditioning) return false;
      if (this.amenities.pool && !property.amenities.pool) return false;
      
      return true;
    });
    
    // Sort the results
    this.sortResults();
  }
  
  resetFilters(): void {
    this.priceRange = { min: null, max: null };
    this.amenities = {
      wifi: false,
      parking: false,
      airConditioning: false,
      pool: false
    };
    this.sortBy = 'popularity';
    this.applyFilters();
  }
  
  sortResults(): void {
    this.filteredProperties.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          // In a real app, you would sort by date added
          return 0;
        case 'popularity':
        default:
          // In a real app, you would sort by popularity/views
          return 0;
      }
    });
  }
  
  onFavoriteToggled(propertyId: string): void {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      property.isFavorite = !property.isFavorite;
      // In a real app, you would update the favorite status via a service
    }
  }
}
