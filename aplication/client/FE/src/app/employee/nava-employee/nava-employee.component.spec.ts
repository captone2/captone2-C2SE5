import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavaEmployeeComponent } from './nava-employee.component';

describe('NavaEmployeeComponent', () => {
  let component: NavaEmployeeComponent;
  let fixture: ComponentFixture<NavaEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavaEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
