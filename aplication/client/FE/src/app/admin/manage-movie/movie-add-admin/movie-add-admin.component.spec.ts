import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddAdminComponent } from './movie-add-admin.component';

describe('MovieAddAdminComponent', () => {
  let component: MovieAddAdminComponent;
  let fixture: ComponentFixture<MovieAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
