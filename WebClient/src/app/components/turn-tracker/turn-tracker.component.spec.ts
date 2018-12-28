import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../../services/game.service'
import { TurnTrackerComponent } from './turn-tracker.component';
import { CricketState, TurnState, PlayerState } from '../../DartsToday/Cricket';

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
    let gs : CricketState;
    
    beforeEach(() => {
      gs = new CricketState();
      gs.activeturn = new TurnState();
      gs.players.push(new PlayerState({}));
      component.gameState.s = gs;
      fixture.detectChanges();
    });
    
    it('Display turn number', () => {
      expect(compiled.querySelector('#turn').textContent).toBe('1');
    });

    it('Dart state displayed as noscore', () => {
      expect(compiled.querySelector('#dart1').getAttribute("class")).toContain("icon-dart-turn-attempt");
      expect(compiled.querySelector('#dart2').getAttribute("class")).toContain("icon-dart-turn-attempt");
      expect(compiled.querySelector('#dart3').getAttribute("class")).toContain("icon-dart-turn-attempt");
    });

    it('After two darts, Darts state displayed as scores for Dart1 & Dart2', () => {
      gs.activeturn.dartsThrown = 2;
      fixture.detectChanges();
      expect(compiled.querySelector('#dart1').getAttribute("class")).toContain("icon-dart-turn-done");
      expect(compiled.querySelector('#dart2').getAttribute("class")).toContain("icon-dart-turn-done");
      expect(compiled.querySelector('#dart3').getAttribute("class")).toContain("icon-dart-turn-attempt");
    });
  });
});