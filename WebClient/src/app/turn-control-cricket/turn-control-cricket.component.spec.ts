import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnControlCricketComponent } from './turn-control-cricket.component';
import { GameService } from '../services/game.service'
import { ActionsCricket } from '../DartsToday/Cricket'

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

  describe('Button wiring', () => {

    it('Button endTurn', () => {
      assertButtonToCommand("#btnDone", {action: ActionsCricket.endTurn});
    });

    it('Button missed', () => {
      assertButtonToCommand("#btnMis", {action: ActionsCricket.score, score:0});
    });

    it('Button back', () => {
      assertButtonToCommand("#btnBack", {action: "back"});
    });
    
    [20,19,18,17,16,15].forEach(element => {
      it('Buttons Single:' + element, () => {
        assertButtonToCommand("#btnSingle" + element, {action: ActionsCricket.score, score:element, muliplier:1});
      });

      it('Buttons Dubble:' + element, () => {
        assertButtonToCommand("#btnDubble" + element, {action: ActionsCricket.score, score:element, muliplier:2});
      });

      it('Buttons Triple:' + element, () => {
        assertButtonToCommand("#btnTriple" + element, {action: ActionsCricket.score, score:element, muliplier:3});
      });
    });

    it('Buttons Single: bull', () => {
      assertButtonToCommand("#btnSingleBull", {action: ActionsCricket.score, score:25, muliplier:1});
    });

    it('Buttons Dubble: bull', () => {
      assertButtonToCommand("#btnDubbleBull", {action: ActionsCricket.score, score:25, muliplier:2});
    });
    
  });
});


