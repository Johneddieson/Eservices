import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebusinesspermitComponent } from './createbusinesspermit.component';

describe('CreatebusinesspermitComponent', () => {
  let component: CreatebusinesspermitComponent;
  let fixture: ComponentFixture<CreatebusinesspermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebusinesspermitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebusinesspermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
