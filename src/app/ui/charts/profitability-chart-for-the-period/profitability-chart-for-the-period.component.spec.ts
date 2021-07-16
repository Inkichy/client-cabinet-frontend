import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitabilityChartForThePeriodComponent } from './profitability-chart-for-the-period.component';

describe('ProfitabilityChartForThePeriodComponent', () => {
  let component: ProfitabilityChartForThePeriodComponent;
  let fixture: ComponentFixture<ProfitabilityChartForThePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitabilityChartForThePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitabilityChartForThePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
