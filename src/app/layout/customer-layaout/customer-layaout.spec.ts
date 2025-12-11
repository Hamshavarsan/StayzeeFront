import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLayaout } from './customer-layaout';

describe('CustomerLayaout', () => {
  let component: CustomerLayaout;
  let fixture: ComponentFixture<CustomerLayaout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLayaout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLayaout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
