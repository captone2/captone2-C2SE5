import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateAdminComponent } from './employee-update-admin.component';

describe('EmployeeUpdateAdminComponent', () => {
  let component: EmployeeUpdateAdminComponent;
  let fixture: ComponentFixture<EmployeeUpdateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUpdateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
