import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddAdminComponent } from './employee-add-admin.component';

describe('EmployeeAddAdminComponent', () => {
  let component: EmployeeAddAdminComponent;
  let fixture: ComponentFixture<EmployeeAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
