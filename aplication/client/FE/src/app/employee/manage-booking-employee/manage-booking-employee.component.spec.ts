import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingEmployeeComponent } from './manage-booking-employee.component';

describe('ManageBookingEmployeeComponent', () => {
  let component: ManageBookingEmployeeComponent;
  let fixture: ComponentFixture<ManageBookingEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBookingEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
