import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTrackerComponent } from './turn-tracker.component';
import { TurnState, DartState } from '../DartsToday/TurnState';

describe('TurnTrackerComponent', () => {
  let component: TurnTrackerComponent;
  let fixture: ComponentFixture<TurnTrackerComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnTrackerComponent);
    component = fixture.componentInstance;  
    compiled = fixture.debugElement.nativeElement;  
    fixture.detectChanges();
  });

  describe('Initial state', () => {
    it('No turn number displayed', () => {   
      expect(compiled.querySelector('#turn').textContent).toBe('');
    });
  
    it('No dart state displayed', () => {   
      expect(compiled.querySelector('#dart1').getAttribute("class")).not.toContain("icon-dart-turn-attempt");
      expect(compiled.querySelector('#dart2').getAttribute("class")).not.toContain("icon-dart-turn-done");
      expect(compiled.querySelector('#dart3').getAttribute("class")).not.toContain("icon-dart-turn-attempt");
    });
  });

  describe('TurnState set', () => {
    beforeEach(() => {
      component.state = new TurnState(4, [DartState.noscore, DartState.score, DartState.score]);
      fixture.detectChanges();
    });
    
    it('Display turn number', () => {
      expect(compiled.querySelector('#turn').textContent).toBe('4');
    });

    it('Dart state displayed as noscore', () => {
      expect(compiled.querySelector('#dart1').getAttribute("class")).toContain("icon-dart-turn-attempt");
    });

    it('Dart state displayed as score', () => {
      expect(compiled.querySelector('#dart2').getAttribute("class")).toContain("icon-dart-turn-done");
      expect(compiled.querySelector('#dart3').getAttribute("class")).toContain("icon-dart-turn-done");
    });
  });

});
