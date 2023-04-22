import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPointUserComponent } from './history-point-user.component';

describe('HistoryPointUserComponent', () => {
  let component: HistoryPointUserComponent;
  let fixture: ComponentFixture<HistoryPointUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPointUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPointUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
