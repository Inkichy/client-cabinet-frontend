import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPortfolioBtnsComponent } from './bottom-portfolio-btns.component';

describe('BottomPortfolioBtnsComponent', () => {
  let component: BottomPortfolioBtnsComponent;
  let fixture: ComponentFixture<BottomPortfolioBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomPortfolioBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPortfolioBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
