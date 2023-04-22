import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListAdminComponent } from './employee-list-admin.component';

describe('EmployeeListAdminComponent', () => {
  let component: EmployeeListAdminComponent;
  let fixture: ComponentFixture<EmployeeListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
