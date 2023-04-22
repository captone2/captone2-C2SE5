import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeleteAdminComponent } from './employee-delete-admin.component';

describe('EmployeeDeleteAdminComponent', () => {
  let component: EmployeeDeleteAdminComponent;
  let fixture: ComponentFixture<EmployeeDeleteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDeleteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
