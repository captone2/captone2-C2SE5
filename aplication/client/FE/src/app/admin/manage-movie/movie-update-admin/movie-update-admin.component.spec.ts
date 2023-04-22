import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUpdateAdminComponent } from './movie-update-admin.component';

describe('MovieUpdateAdminComponent', () => {
  let component: MovieUpdateAdminComponent;
  let fixture: ComponentFixture<MovieUpdateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieUpdateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
