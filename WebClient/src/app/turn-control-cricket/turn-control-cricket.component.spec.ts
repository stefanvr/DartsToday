import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnControlCricketComponent } from './turn-control-cricket.component';
import { GameService } from '../services/game.service'
import { ActionsCricket, DartScore, BULL } from '../DartsToday/Cricket'

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
    beforeEach(() => {
      component.gameState = { s: { } };
      spyOn(gameService, 'commandEnabled').and.returnValue(true);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
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
      component.gameState = { s: { } };
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
      component.gameState = { s: {} };
      spyOn(gameService, 'commandEnabled').and.returnValue(false);
      fixture.detectChanges();
      
      assertButtonNoCommand("#btnDoubleBull")
    });
  });
});


