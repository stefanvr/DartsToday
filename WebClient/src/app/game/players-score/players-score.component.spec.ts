import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../game.component';
import { PlayersScoreComponent } from './players-score.component';

import { GAME_STATES_GAME, PLAYER1} from '../../DartsToday/CricketGame.examples'
import { Cricket } from '../../DartsToday/Cricket'

describe('PlayersScoreComponent', () => {
  let component: PlayersScoreComponent;
  let fixture: ComponentFixture<PlayersScoreComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersScoreComponent ],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersScoreComponent);
    component = fixture.componentInstance;  
    compiled = fixture.debugElement.nativeElement;  
    fixture.detectChanges();
  });

  describe('Initial state', () => {
    it('No players, players to be []', () => {   
      expect(component.players).toEqual([]);
    });

    describe('Template test:', () => { 
      it('No players', () => {   
        expect(compiled.querySelector('.player')).toBeNull;
      });
    });
  });

  describe('With game state:', () => {
    beforeEach(() => {
      let service = TestBed.get(GameService);
      service.executeScenario(GAME_STATES_GAME, Cricket);
      fixture.detectChanges();
    });

    it('No players, players to be []', () => {   
      expect(component.players.length).toBe(2);
    });

    it('Active player, player1,  post fix class: active', () => {   
      expect(component.activePlayer(component.players[0])).toBe("active-player");
    });

    it('Not active player, player2,  post fix class: ""', () => {   
      expect(component.activePlayer(component.players[1])).toBe("");
    });

    it('Single score,  post fix class: "score-single"', () => {   
      expect(component.scoreState(18, component.players[0])).toBe("score-single");
    });
    
    it('Double score,  post fix class: "score-double"', () => {   
      expect(component.scoreState(19, component.players[0])).toBe("score-double");
    });

    it('Triple score,  post fix class: "score-triple"', () => {   
      expect(component.scoreState(20, component.players[0])).toBe("score-triple");
    });

    describe('Template test:', () => {
      it('Show player name', () => {   
        expect(compiled.querySelector('.playername').textContent).toEqual(PLAYER1.name);
      });
    });

    describe('Should not happen:', () => { 
      it('Invalid score"', () => {
        let INVALID_SCORE = -1;   
        let player = component.players[0];
        player.score[20] = INVALID_SCORE  
        expect(component.scoreState(20, player)).toBe("");
      });
    });
  });
});