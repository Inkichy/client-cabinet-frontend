import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuikComponent } from './quik.component';

describe('QuikComponent', () => {
  let component: QuikComponent;
  let fixture: ComponentFixture<QuikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
