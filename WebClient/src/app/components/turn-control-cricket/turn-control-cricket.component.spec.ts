import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnControlCricketComponent } from './turn-control-cricket.component';
import { GameService } from '../../services/game.service'

import {GAME_STATES_GAME, PLAYER1_WIN_GAME, PLAYER1} from '../../DartsToday/CricketGameExamples'
import { ActionsCricket, CricketState, DartScore, BULL } from '../../DartsToday/Cricket'

describe('TurnControlCricketComponent', () => {
  let component: TurnControlCricketComponent;
  let fixture: ComponentFixture<TurnControlCricketComponent>;
  let compiled: any;
  let gameService :GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnControlCricketComponent ],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    gameService = TestBed.get(GameService);
    fixture = TestBed.createComponent(TurnControlCricketComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;  
    fixture.detectChanges();
  });

  describe('Initial state', () => {
    it('controlsDisabled is true', () => {
      expect(component.controlsDisabled).toBe(true);
    });

    it('controlsgenericScoreDisabled is true', () => {
      expect(component.controlsDisabled).toBe(true);
    });

    it('controlsScoreDisabled(BULL) is true', () => {
      expect(component.controlsScoreDisabled(BULL)).toBe(true);
    });

    it('controlsScoreState(BULL) css post fix', () => {
      expect(component.controlsScoreState(BULL)).toBe("");
    });
  });

  describe('With game states:', () => {
    beforeEach(() => {
      gameService.executeScenario(GAME_STATES_GAME);
      fixture.detectChanges();
    });

    it('controlsScoreDisabled(20) is true', () => {
      expect(component.controlsScoreDisabled(20)).toBe(true);
    });

    it('controlsScoreState(20) css post fix', () => {
      expect(component.controlsScoreState(20)).toBe("closed");
    });

    it('Active player with closed score, controlsScoreState(19) css post fix', () => {
      expect(component.controlsScoreState(17)).toBe("score");
    });

    it('Active player without closed score, controlsScoreState(19) css post fix', () => {
      gameService.execute({ action: ActionsCricket.endTurn});
      fixture.detectChanges();
      expect(component.controlsScoreState(17)).toBe("open");
    });
  });

  describe('With  player1 won game state:', () => {
    beforeEach(() => {
      let service = <GameService>TestBed.get(GameService);
      service.executeScenario(PLAYER1_WIN_GAME);
      fixture.detectChanges();
    });

    it('controlsDisabled is true', () => {
      expect(component.controlsDisabled).toBe(true);
    });
  });

  function assertButtonToCommand(buttonId : string, command: any)
  {
    spyOn(gameService, 'execute');
    let button = fixture.debugElement.nativeElement.querySelector(buttonId);
    button.click();
    expect(gameService.execute).toHaveBeenCalled();
    // @ts-ignore
    expect(gameService.execute.calls.mostRecent().args[0])
        .toEqual(command);
  }

  function assertButtonNoCommand(buttonId : string)
  {
    spyOn(gameService, 'execute');
    let button = fixture.debugElement.nativeElement.querySelector(buttonId);
    button.click();
    expect(gameService.execute).not.toHaveBeenCalled();
  }

  describe('Button wiring', () => {
    beforeEach(() => {
      component.gameState = { s: new CricketState() };
      spyOn(gameService, 'commandEnabled').and.returnValue(true);
      fixture.detectChanges();
    });

    it('Button endTurn', () => {
      assertButtonToCommand("#btnDone", {action: ActionsCricket.endTurn});
    });

    it('Button missed', () => {
      assertButtonToCommand("#btnMis", {action: ActionsCricket.score, score: DartScore.miss});
    });

    it('Button back', () => {
      assertButtonToCommand("#btnBack", {action: "back"});
    });
    
    [20,19,18,17,16,15].forEach(element => {
      it('Buttons Single:' + element, () => {
        assertButtonToCommand("#btnSingle" + element, {action: ActionsCricket.score, score:element, multiplier: DartScore.single});
      });

      it('Buttons double:' + element, () => {
        assertButtonToCommand("#btnDouble" + element, {action: ActionsCricket.score, score:element, multiplier: DartScore.double});
      });

      it('Buttons Triple:' + element, () => {
        assertButtonToCommand("#btnTriple" + element, {action: ActionsCricket.score, score:element, multiplier: DartScore.triple});
      });
    });

    it('Buttons Single: bull', () => {
      assertButtonToCommand("#btnSingleBull", {action: ActionsCricket.score, score: BULL, multiplier: DartScore.single});
    });

    it('Buttons Double: bull', () => {
      assertButtonToCommand("#btnDoubleBull", {action: ActionsCricket.score, score: BULL, multiplier:2});
    });
  });

  describe('Button control state', () => {
    it('When there is no game state, disable all buttons', () => {
      component.gameState = { s: null };
      fixture.detectChanges();

      assertButtonNoCommand("#btnDoubleBull")
    });

    it('When score command is not enabled, disable all score buttons', () => {
      component.gameState = { s: new CricketState() };
      spyOn(gameService, 'commandEnabled').and.returnValue(false);
      fixture.detectChanges();
      
      assertButtonNoCommand("#btnDoubleBull")
    });
  });
});


