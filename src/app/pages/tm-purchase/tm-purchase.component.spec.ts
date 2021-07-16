import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmPurchaseComponent } from './tm-purchase.component';

describe('TmPurchaseComponent', () => {
  let component: TmPurchaseComponent;
  let fixture: ComponentFixture<TmPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
