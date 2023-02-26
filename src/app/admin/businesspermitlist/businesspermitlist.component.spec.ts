import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspermitlistComponent } from './businesspermitlist.component';

describe('BusinesspermitlistComponent', () => {
  let component: BusinesspermitlistComponent;
  let fixture: ComponentFixture<BusinesspermitlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesspermitlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesspermitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
