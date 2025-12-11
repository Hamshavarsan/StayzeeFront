import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbars } from './navbars';

describe('Navbars', () => {
  let component: Navbars;
  let fixture: ComponentFixture<Navbars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
