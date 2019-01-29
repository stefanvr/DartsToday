import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTrackerComponent, DART_HIT_ATTEMPT, DART_HIT } from './turn-tracker.component';
import { DartThrown } from 'src/app/DartsToday/CricketGame';

import { createTestLeg } from '../../DartsToday/CricketGame.examples'

describe('TurnTrackerComponent', () => {
  let component: TurnTrackerComponent;
  let fixture: ComponentFixture<TurnTrackerComponent>;
  let compiled: any;

  let testLeg = createTestLeg();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnTrackerComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnTrackerComponent);
    component = fixture.componentInstance;  
    compiled = fixture.debugElement.nativeElement; 
    
    component.leg = testLeg;

    fixture.detectChanges();
  });

  describe('Component state - ', () => {
    it('Turn returns: ' + testLeg.turn, () => { 
       expect(component.turn).toEqual("Turn: " + testLeg.turn);
    });

    it('First dart returns: DART_HIT', () => { 
      expect(component.dartState(DartThrown.first)).toEqual(DART_HIT);
    });

    it('Second dart returns: DART_HIT_ATTEMPT', () => { 
      expect(component.dartState(DartThrown.second)).toEqual(DART_HIT_ATTEMPT);
    });

    it('Third dart returns: DART_HIT_ATTEMPT', () => { 
      expect(component.dartState(DartThrown.third)).toEqual(DART_HIT_ATTEMPT);
    });

    it('Bonus to returns: ' + testLeg.turnScore.bonus, () => { 
       expect(component.bonus).toBe(testLeg.turnScore.bonus);
    });
  });

  describe('Template state:', () => {
      it('Turn number displayed', () => {   
        expect(compiled.querySelector('#turn').textContent).toEqual("Turn: " + testLeg.turn);
      });

      it('First dart returns: DART_HIT', () => { 
        expect(compiled.querySelector('#dart1').getAttribute("class")).toContain("icon-dart-turn-done");
      });
  
      it('Second dart returns: DART_HIT_ATTEMPT', () => { 
        expect(compiled.querySelector('#dart2').getAttribute("class")).toContain("icon-dart-turn-attempt");
      });
  
      it('Third dart returns: DART_HIT_ATTEMPT', () => { 
        expect(compiled.querySelector('#dart3').getAttribute("class")).toContain("icon-dart-turn-attempt");
      });  
      
      it('Bonus to returns: ' + testLeg.turnScore.bonus, () => { 
        expect(compiled.querySelector('#bonus').textContent).toEqual(testLeg.turnScore.bonus.toString());
     });
  });    
});