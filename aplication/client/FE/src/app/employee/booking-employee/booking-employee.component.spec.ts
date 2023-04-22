import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeComponent } from './booking-employee.component';

describe('BookingEmployeeComponent', () => {
  let component: BookingEmployeeComponent;
  let fixture: ComponentFixture<BookingEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
