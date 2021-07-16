import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSlickComponent } from './footer-slick.component';

describe('FooterSlickComponent', () => {
  let component: FooterSlickComponent;
  let fixture: ComponentFixture<FooterSlickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSlickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSlickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
