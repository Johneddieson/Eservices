import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewbusinesspermitComponent } from './renewbusinesspermit.component';

describe('RenewbusinesspermitComponent', () => {
  let component: RenewbusinesspermitComponent;
  let fixture: ComponentFixture<RenewbusinesspermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewbusinesspermitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewbusinesspermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
