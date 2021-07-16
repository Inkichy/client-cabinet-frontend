import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustManagementFilterComponent } from './trust-management-filter.component';

describe('TrustManagementFilterComponent', () => {
  let component: TrustManagementFilterComponent;
  let fixture: ComponentFixture<TrustManagementFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustManagementFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
