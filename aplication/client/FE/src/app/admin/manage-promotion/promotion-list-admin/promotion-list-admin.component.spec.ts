import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionListAdminComponent } from './promotion-list-admin.component';

describe('PromotionListAdminComponent', () => {
  let component: PromotionListAdminComponent;
  let fixture: ComponentFixture<PromotionListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
