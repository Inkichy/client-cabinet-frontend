import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBlock2Component } from './products-block2.component';

describe('ProductsBlock2Component', () => {
  let component: ProductsBlock2Component;
  let fixture: ComponentFixture<ProductsBlock2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBlock2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBlock2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
