import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTrackerComponent } from './turn-tracker.component';

describe('TurnTrackerComponent', () => {
  let component: TurnTrackerComponent;
  let fixture: ComponentFixture<TurnTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
