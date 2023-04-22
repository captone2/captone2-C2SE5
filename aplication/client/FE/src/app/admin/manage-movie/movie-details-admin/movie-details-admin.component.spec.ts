import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsAdminComponent } from './movie-details-admin.component';

describe('MovieDetailsAdminComponent', () => {
  let component: MovieDetailsAdminComponent;
  let fixture: ComponentFixture<MovieDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
