import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBlockWideSliderComponent } from './products-block-wide-slider.component';

describe('ProductsBlockWideSliderComponent', () => {
  let component: ProductsBlockWideSliderComponent;
  let fixture: ComponentFixture<ProductsBlockWideSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBlockWideSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBlockWideSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
