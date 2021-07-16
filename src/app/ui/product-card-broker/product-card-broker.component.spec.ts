import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardBrokerComponent } from './product-card-broker.component';

describe('ProductCardBrokerComponent', () => {
  let component: ProductCardBrokerComponent;
  let fixture: ComponentFixture<ProductCardBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
