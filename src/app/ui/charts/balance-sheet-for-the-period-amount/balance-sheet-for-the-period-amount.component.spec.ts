import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetForThePeriodAmountComponent } from './balance-sheet-for-the-period-amount.component';

describe('BalanceSheetForThePeriodAmountComponent', () => {
  let component: BalanceSheetForThePeriodAmountComponent;
  let fixture: ComponentFixture<BalanceSheetForThePeriodAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceSheetForThePeriodAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetForThePeriodAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
