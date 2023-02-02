import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaxeasyComponent } from './vaxeasy.component';

describe('VaxeasyComponent', () => {
  let component: VaxeasyComponent;
  let fixture: ComponentFixture<VaxeasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaxeasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaxeasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
