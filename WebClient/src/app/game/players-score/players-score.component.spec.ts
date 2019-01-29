import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createTestLeg, SCORE_OPTION_20, PLAYER1 } from '../../DartsToday/CricketGame.examples'

import { CricketScore } from 'src/app/DartsToday/CricketGame';
import { PlayersScoreComponent, 
         CURRENT_PLAYER, 
         SCORE_SINGLE, SCORE_DOUBLE, SCORE_TRIPLE, SCORE_CLEAR 
  } from './players-score.component';


describe('PlayersScoreComponent', () => {
  let component: PlayersScoreComponent;
  let fixture: ComponentFixture<PlayersScoreComponent>;
  let compiled: any;

  let testLeg = createTestLeg();
  let currentPlayer;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersScoreComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersScoreComponent);
    component = fixture.componentInstance;  
    compiled = fixture.debugElement.nativeElement;  

    component.leg = testLeg;
    currentPlayer = testLeg.players[0];
    testLeg.currentPlayer = currentPlayer;

    fixture.detectChanges();
  });

  it('players returns: ' + testLeg.players.length, () => {
    expect(component.players.length).toEqual(testLeg.players.length);
  });

  describe('activePlayer:', () => {
    it('for active return: ""', () => {
      expect(component.activePlayer(testLeg.players[0])).toEqual(CURRENT_PLAYER);
    });

    it('for not active player: ""', () => {
       expect(component.activePlayer(testLeg.players[1])).toEqual("");
    });
  });

  describe('With scoreState:', () => {
    it('No score,  post fix class: SCORE_CLEAR', () => { 
      currentPlayer.score[SCORE_OPTION_20] = CricketScore.noHit;
      expect(component.scoreState(SCORE_OPTION_20, component.players[0])).toEqual(SCORE_CLEAR);
    });
    
    it('Single score,  post fix class: SCORE_SINGLE', () => {   
      currentPlayer.score[SCORE_OPTION_20] = CricketScore.oneHit;
      expect(component.scoreState(SCORE_OPTION_20, component.players[0])).toEqual(SCORE_SINGLE);
    });
    
    it('Double score,  post fix class: SCORE_DOUBLE', () => {   
      currentPlayer.score[SCORE_OPTION_20] = CricketScore.twoHits;
      expect(component.scoreState(SCORE_OPTION_20, component.players[0])).toEqual(SCORE_DOUBLE);
    });

    it('Triple score,  post fix class: SCORE_TRIPLE', () => {   
      currentPlayer.score[SCORE_OPTION_20] = CricketScore.closed;
      expect(component.scoreState(SCORE_OPTION_20, component.players[0])).toEqual(SCORE_TRIPLE);
    });

    describe('Should not happen:', () => { 
      it('Invalid score"', () => {
        let INVALID_SCORE = -1;   
        currentPlayer.score[SCORE_OPTION_20] = INVALID_SCORE;
        expect(component.scoreState(SCORE_OPTION_20, currentPlayer)).toEqual(SCORE_CLEAR);
      });
    });
  });

  describe('Template test:', () => {
    it('Show player name', () => {   
      expect(compiled.querySelector('.playername').textContent).toEqual(PLAYER1.name);
    });
  });
});