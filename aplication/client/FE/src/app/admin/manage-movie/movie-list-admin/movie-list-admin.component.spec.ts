import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListAdminComponent } from './movie-list-admin.component';

describe('MovieListAdminComponent', () => {
  let component: MovieListAdminComponent;
  let fixture: ComponentFixture<MovieListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
