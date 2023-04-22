import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingUserComponent } from './manage-booking-user.component';

describe('ManageBookingUserComponent', () => {
  let component: ManageBookingUserComponent;
  let fixture: ComponentFixture<ManageBookingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBookingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
