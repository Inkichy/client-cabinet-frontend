import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustManagementComponent } from './trust-management.component';

describe('TrustManagementComponent', () => {
  let component: TrustManagementComponent;
  let fixture: ComponentFixture<TrustManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
