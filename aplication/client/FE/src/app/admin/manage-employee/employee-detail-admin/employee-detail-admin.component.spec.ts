import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailAdminComponent } from './employee-detail-admin.component';

describe('EmployeeDetailAdminComponent', () => {
  let component: EmployeeDetailAdminComponent;
  let fixture: ComponentFixture<EmployeeDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
