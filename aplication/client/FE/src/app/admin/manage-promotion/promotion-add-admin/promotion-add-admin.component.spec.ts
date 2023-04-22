import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAddAdminComponent } from './promotion-add-admin.component';

describe('PromotionAddAdminComponent', () => {
  let component: PromotionAddAdminComponent;
  let fixture: ComponentFixture<PromotionAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
