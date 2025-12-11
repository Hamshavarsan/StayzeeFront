import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalhomeComponent } from './rentalhome.component';

describe('RentalhomeComponent', () => {
  let component: RentalhomeComponent;
  let fixture: ComponentFixture<RentalhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
