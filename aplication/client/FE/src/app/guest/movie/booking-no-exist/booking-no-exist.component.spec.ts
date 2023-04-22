import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNoExistComponent } from './booking-no-exist.component';

describe('BookingNoExistComponent', () => {
  let component: BookingNoExistComponent;
  let fixture: ComponentFixture<BookingNoExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNoExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
