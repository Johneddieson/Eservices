import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspermitbyidprintoutComponent } from './businesspermitbyidprintout.component';

describe('BusinesspermitbyidprintoutComponent', () => {
  let component: BusinesspermitbyidprintoutComponent;
  let fixture: ComponentFixture<BusinesspermitbyidprintoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesspermitbyidprintoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesspermitbyidprintoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
