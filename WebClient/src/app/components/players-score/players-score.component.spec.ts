import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersScoreComponent } from './players-score.component';
import { GameService } from '../../services/game.service'

import {GAME_STATES_GAME, PLAYER1} from '../../DartsToday/CricketGameExamples'

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
      let service = <GameService>TestBed.get(GameService);
      service.executeScenario(GAME_STATES_GAME);
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
  });
});