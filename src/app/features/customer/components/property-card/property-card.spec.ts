import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent, Property } from './property-card';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;
  
  const mockProperty: Property = {
    id: '1',
    title: 'Test Property',
    description: 'Test Description',
    price: 1000,
    imageUrl: 'test.jpg',
    location: 'Test Location',
    bedrooms: 2,
    bathrooms: 1,
    isFavorite: false,
    amenities: {
      wifi: true,
      parking: false,
      airConditioning: true,
      pool: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    component.property = mockProperty;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display property title', () => {
    const titleElement = fixture.nativeElement.querySelector('.property-title');
    expect(titleElement.textContent).toContain(mockProperty.title);
  });

  it('should display property price', () => {
    const priceElement = fixture.nativeElement.querySelector('.property-price');
    expect(priceElement.textContent).toContain(mockProperty.price);
  });

  it('should toggle favorite status', () => {
    const initialFavoriteStatus = component.property.isFavorite;
    component.toggleFavorite();
    expect(component.property.isFavorite).toBe(!initialFavoriteStatus);
  });
});
