import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRegisterComponent } from './notification-register.component';

describe('NotificationRegisterComponent', () => {
  let component: NotificationRegisterComponent;
  let fixture: ComponentFixture<NotificationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
