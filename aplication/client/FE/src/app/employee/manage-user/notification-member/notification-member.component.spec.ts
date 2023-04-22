import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMemberComponent } from './notification-member.component';

describe('NotificationMemberComponent', () => {
  let component: NotificationMemberComponent;
  let fixture: ComponentFixture<NotificationMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
