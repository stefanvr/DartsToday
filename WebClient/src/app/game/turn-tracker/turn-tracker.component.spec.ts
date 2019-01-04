import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../../services/game.service'
import { TurnTrackerComponent } from './turn-tracker.component';

import {GAME_STATES_GAME, GAME_STATES_GAME_ROUND } from '../../DartsToday/CricketGameExamples'
import { Cricket } from '../../DartsToday/Cricket';

describe('TurnTrackerComponent', () => {
  let component: TurnTrackerComponent;
  let fixture: ComponentFixture<TurnTrackerComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnTrackerComponent ],
      providers: [GameService]
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
    it('No dart state displayed', () => { 
       expect(component.turn).toBe("");
    });

    it('No dart state displayed', () => { 
      expect(component.dartState(1)).toBe("");
      expect(component.dartState(2)).toBe("");
      expect(component.dartState(3)).toBe("");
    });

    it('No Score displayed', () => { 
      expect(component.turnBonus).toBe("");
    });
  });

  describe('With game state:', () => {
    beforeEach(() => {
      let service = <GameService>TestBed.get(GameService);
      service.executeScenario(GAME_STATES_GAME, Cricket);
      fixture.detectChanges();
    });

    it('Turn number', () => {   
      expect(component.turn).toEqual("Turn: " + GAME_STATES_GAME_ROUND);
    });
  
    it('Turn number', () => {   
      expect(component.dartState(0)).toEqual("turn-done");
      expect(component.dartState(1)).toEqual("turn-done");
      expect(component.dartState(2)).toEqual("turn-attempt");
    });

    it('Bonus displayed', () => { 
      expect(component.turnBonus).toBe("Bonus: 51");
    });

    describe('Template test:', () => {
      it('Turn number displayed', () => {   
        expect(compiled.querySelector('#turn').textContent).toEqual("Turn: " + GAME_STATES_GAME_ROUND.toString());
      });

      it('After two darts, Darts state displayed as scores for Dart1 & Dart2', () => {
        expect(compiled.querySelector('#dart1').getAttribute("class")).toContain("icon-dart-turn-done");
        expect(compiled.querySelector('#dart2').getAttribute("class")).toContain("icon-dart-turn-done");
        expect(compiled.querySelector('#dart3').getAttribute("class")).toContain("icon-dart-turn-attempt");
      });
    });
  });    
});