import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBlockComponent } from './products-block.component';

describe('ProductsBlockComponent', () => {
  let component: ProductsBlockComponent;
  let fixture: ComponentFixture<ProductsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
