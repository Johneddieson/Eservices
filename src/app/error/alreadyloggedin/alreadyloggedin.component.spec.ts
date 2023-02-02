import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyloggedinComponent } from './alreadyloggedin.component';

describe('AlreadyloggedinComponent', () => {
  let component: AlreadyloggedinComponent;
  let fixture: ComponentFixture<AlreadyloggedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyloggedinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyloggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
