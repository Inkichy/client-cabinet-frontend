import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureOfIssuersByCurrencyComponent } from './structure-of-issuers-by-currency.component';

describe('StructureOfIssuersByCurrencyComponent', () => {
  let component: StructureOfIssuersByCurrencyComponent;
  let fixture: ComponentFixture<StructureOfIssuersByCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureOfIssuersByCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureOfIssuersByCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
