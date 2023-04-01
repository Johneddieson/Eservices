import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspermitbyidComponent } from './businesspermitbyid.component';

describe('BusinesspermitbyidComponent', () => {
  let component: BusinesspermitbyidComponent;
  let fixture: ComponentFixture<BusinesspermitbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesspermitbyidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesspermitbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
