import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRequestComponent } from './online-request.component';

describe('OnlineRequestComponent', () => {
  let component: OnlineRequestComponent;
  let fixture: ComponentFixture<OnlineRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
