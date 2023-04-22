import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyEmployeeComponent } from './notify-employee.component';

describe('NotifyEmployeeComponent', () => {
  let component: NotifyEmployeeComponent;
  let fixture: ComponentFixture<NotifyEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
