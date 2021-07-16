import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustManagementDetailComponent } from './trust-management-detail.component';

describe('TrustManagementDetailComponent', () => {
  let component: TrustManagementDetailComponent;
  let fixture: ComponentFixture<TrustManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
