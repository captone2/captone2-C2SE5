import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeAddComponent } from './showtime-add.component';

describe('ShowtimeAddComponent', () => {
  let component: ShowtimeAddComponent;
  let fixture: ComponentFixture<ShowtimeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
