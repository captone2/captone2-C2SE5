import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDeleteAdminComponent } from './promotion-delete-admin.component';

describe('PromotionDeleteAdminComponent', () => {
  let component: PromotionDeleteAdminComponent;
  let fixture: ComponentFixture<PromotionDeleteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionDeleteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionDeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
