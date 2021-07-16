import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPanelImageComponent } from './top-panel-image.component';

describe('TopPanelImageComponent', () => {
  let component: TopPanelImageComponent;
  let fixture: ComponentFixture<TopPanelImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPanelImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPanelImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
