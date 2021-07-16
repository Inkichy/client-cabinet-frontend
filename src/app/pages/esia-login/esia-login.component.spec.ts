import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiaLoginComponent } from './esia-login.component';

describe('EsiaLoginComponent', () => {
  let component: EsiaLoginComponent;
  let fixture: ComponentFixture<EsiaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
