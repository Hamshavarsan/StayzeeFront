import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRental } from './create-rental';

describe('CreateRental', () => {
  let component: CreateRental;
  let fixture: ComponentFixture<CreateRental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
