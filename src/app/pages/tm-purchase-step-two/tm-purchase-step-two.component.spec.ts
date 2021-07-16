import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmPurchaseStepTwoComponent } from './tm-purchase-step-two.component';

describe('TmPurchaseStepTwoComponent', () => {
  let component: TmPurchaseStepTwoComponent;
  let fixture: ComponentFixture<TmPurchaseStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmPurchaseStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmPurchaseStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
