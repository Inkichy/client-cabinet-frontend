import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntranceMobileComponent } from './header-entrance-mobile.component';

describe('HeaderEntranceMobileComponent', () => {
  let component: HeaderEntranceMobileComponent;
  let fixture: ComponentFixture<HeaderEntranceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEntranceMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEntranceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
