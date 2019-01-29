import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent, CLOSED_STATE, NONE_CLOSED_STATE, NO_LABEL } from './game-score.component';
import { GameScore } from 'src/app/DartsToday/CricketGame';

import { createTestLeg, PLAYER1, SCORE_OPTION_20 } from '../../DartsToday/CricketGame.examples'

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;
  let compiled: any;
  
  let testLeg = createTestLeg();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;  

    component.leg = testLeg;

    fixture.detectChanges();
  });

  describe('scoreState:', () => {
    it('for open score returns NONE_CLOSED_STATE', () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.open;
      expect(component.scoreState(SCORE_OPTION_20)).toEqual(NONE_CLOSED_STATE);
    });

    it('for playerToScore score returns NONE_CLOSED_STATE', () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.playerToScore;
      expect(component.scoreState(SCORE_OPTION_20)).toEqual(NONE_CLOSED_STATE);
    });

    it('for closed score returns CLOSED_STATE', () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.closed;
      expect(component.scoreState(SCORE_OPTION_20)).toEqual(CLOSED_STATE);
    });
  });

  describe('scoreStateLabel:', () => {
    it('for open score (' + SCORE_OPTION_20 + ') returns ' + SCORE_OPTION_20, () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.open;
      expect(component.scoreStateLabel(SCORE_OPTION_20)).toEqual(SCORE_OPTION_20);
    });

    it('for playerToScore (' + SCORE_OPTION_20 + ') returns ' + SCORE_OPTION_20, () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.playerToScore;
      expect(component.scoreStateLabel(SCORE_OPTION_20)).toEqual(SCORE_OPTION_20);
    });

    it('for closed score returns CLOSED_STATE', () => {
      testLeg.game.score[SCORE_OPTION_20] = GameScore.closed;
      expect(component.scoreStateLabel(SCORE_OPTION_20)).toEqual(NO_LABEL);
    });
  });

  describe('playerwon:', () => {
    it('with no winner to return: ""', () => {
      expect(component.playerwon).toEqual("");
    });

    it('with winner to return: ""', () => {
      testLeg.winner = PLAYER1;
      expect(component.playerwon).toEqual("Win: " + PLAYER1.name);
    });
  });
});