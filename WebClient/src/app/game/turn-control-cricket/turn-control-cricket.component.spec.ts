import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createCommmand } from 'src/app/app.state';
import { TurnControlCricketComponent } from './turn-control-cricket.component';

import {  createTestLeg, SCORE_OPTION_20 } from '../../DartsToday/CricketGame.examples'
import { ActionsCricket, BULL, DartScore, PlayerScore } from 'src/app/DartsToday/CricketGame';

describe('TurnControlCricketComponent', () => {
  let dispatcher = { dispatch: (command) => { console.log('>');}}

  let component: TurnControlCricketComponent;
  let fixture: ComponentFixture<TurnControlCricketComponent>;
  let compiled: any;

  let testLeg = createTestLeg();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnControlCricketComponent ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnControlCricketComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;  

    component.leg = testLeg;
    component.dispatcher = dispatcher;

    fixture.detectChanges();
  });

  describe('controlsDisabled', () => {
    it('When actionStartGameEnabled is true, returns true', () => {
      testLeg.actionStartGameEnabled = true;
      expect(component.controlsDisabled).toBe(true);
    });

    it('When actionStartGameEnabled is false, returns false', () => {
      testLeg.actionStartGameEnabled = false;
      fixture.detectChanges();
      expect(component.controlsDisabled).toBe(false);
    });
  });

  describe('controlsBackDisabled', () => {
    it('Not implemented, returns true', () => {
      expect(component.controlsBackDisabled).toBe(true);
    });
  });

  describe('controlsScoreDisabled', () => {
    it('controlsEnTurnDisabled(), returns true', () => {
      testLeg.actionStartGameEnabled = true;
      testLeg.actionScoreEnabled = true;
      testLeg.currentPlayer.state[SCORE_OPTION_20] === PlayerScore.open
      expect(component.controlsScoreDisabled(SCORE_OPTION_20)).toBe(true);
    });

    it('PlayerScore.closed, returns true', () => {
      testLeg.actionStartGameEnabled = false;
      testLeg.actionScoreEnabled = true;
      testLeg.currentPlayer.state[SCORE_OPTION_20] = PlayerScore.closed
      expect(component.controlsScoreDisabled(SCORE_OPTION_20)).toBe(true);
    });

    it('actionScoreEnabled = false, returns false', () => {
      testLeg.actionStartGameEnabled = false;
      testLeg.actionScoreEnabled = false;
      testLeg.currentPlayer.state[SCORE_OPTION_20] = PlayerScore.open;
      expect(component.controlsScoreDisabled(SCORE_OPTION_20)).toBe(true);
    });

    it('Game started/not closed/Score enabled, returns false', () => {
      testLeg.actionStartGameEnabled = false;
      testLeg.actionScoreEnabled = true;
      testLeg.currentPlayer.state[SCORE_OPTION_20] = PlayerScore.open;
      expect(component.controlsScoreDisabled(SCORE_OPTION_20)).toBe(false);
    });
  });

  describe('controlsScoreState', () => {
    it('Return closed', () => {
      testLeg.currentPlayer.state[SCORE_OPTION_20] = PlayerScore.closed;
      expect(component.controlsScoreState(SCORE_OPTION_20)).toBe('closed');
    });
  });

  function assertButtonToCommand(buttonId : string, command: any)
  {
    spyOn(dispatcher, 'dispatch');
    let button = fixture.debugElement.nativeElement.querySelector(buttonId);
    button.click();
    expect(dispatcher.dispatch).toHaveBeenCalled();
    // @ts-ignore
    expect(dispatcher.dispatch.calls.mostRecent().args[0])
        .toEqual(command);
  }

  describe('Button wiring', () => {
    beforeEach(() => {
      testLeg.actionStartGameEnabled = false;
      testLeg.actionScoreEnabled = true;
      testLeg.actionEndTurnEnabled = true;
      testLeg.currentPlayer.state[SCORE_OPTION_20] === PlayerScore.open;
      fixture.detectChanges();
    });

    it('Button endTurn', () => {
      assertButtonToCommand("#btnDone", createCommmand(ActionsCricket.endTurn));
    });

    it('Button missed', () => {
      assertButtonToCommand("#btnMis", createCommmand(ActionsCricket.score, { score: DartScore.miss }));
    });

    // todo
    /*it('Button back', () => {
      assertButtonToCommand("#btnBack", createCommmand(ActionsCricket.undo));
    });*/

    // todo 20??
    [19,18,17,16,15].forEach(element => {
      it('Buttons Single:' + element, () => {
        assertButtonToCommand("#btnSingle" + element, createCommmand(ActionsCricket.score, { score:element, multiplier: DartScore.single}));
      });

      it('Buttons double:' + element, () => {
        assertButtonToCommand("#btnDouble" + element, createCommmand(ActionsCricket.score, { score:element, multiplier: DartScore.double}));
      });

      it('Buttons Triple:' + element, () => {
        assertButtonToCommand("#btnTriple" + element, createCommmand(ActionsCricket.score, { score:element, multiplier: DartScore.triple}));
      });
    });

    it('Buttons Single: bull', () => {
      assertButtonToCommand("#btnSingleBull", createCommmand(ActionsCricket.score, { score: BULL, multiplier: DartScore.single}));
    });

    it('Buttons Double: bull', () => {
      assertButtonToCommand("#btnDoubleBull", createCommmand(ActionsCricket.score, { score: BULL, multiplier: DartScore.double}));
    });
  });

  describe('Button control state', () => {
    function assertButtonNoCommand(buttonId : string)
    {
      spyOn(dispatcher, 'dispatch');
      let button = fixture.debugElement.nativeElement.querySelector(buttonId);
      button.click();
      expect(dispatcher.dispatch).not.toHaveBeenCalled();
    }
    
    it('When score command is not enabled, disable all score buttons', () => { 
      testLeg.actionStartGameEnabled = true;   
      fixture.detectChanges(); 
      assertButtonNoCommand("#btnDoubleBull")
    });
  });
}); 