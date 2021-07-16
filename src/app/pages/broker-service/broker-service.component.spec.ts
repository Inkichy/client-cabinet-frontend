import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerServiceComponent } from './broker-service.component';

describe('BrokerServiceComponent', () => {
  let component: BrokerServiceComponent;
  let fixture: ComponentFixture<BrokerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
