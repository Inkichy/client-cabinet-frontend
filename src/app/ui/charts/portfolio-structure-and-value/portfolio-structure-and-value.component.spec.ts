import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioStructureAndValueComponent } from './portfolio-structure-and-value.component';

describe('PortfolioStructureAndValueComponent', () => {
  let component: PortfolioStructureAndValueComponent;
  let fixture: ComponentFixture<PortfolioStructureAndValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioStructureAndValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioStructureAndValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
