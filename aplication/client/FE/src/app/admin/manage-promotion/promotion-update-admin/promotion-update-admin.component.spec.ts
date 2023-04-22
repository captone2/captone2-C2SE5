import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionUpdateAdminComponent } from './promotion-update-admin.component';

describe('PromotionUpdateAdminComponent', () => {
  let component: PromotionUpdateAdminComponent;
  let fixture: ComponentFixture<PromotionUpdateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionUpdateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
