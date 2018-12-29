import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersScoreComponent } from './players-score.component';
import { GameService } from '../../services/game.service'

import { CricketState, PlayerState } from '../../DartsToday/Cricket';

describe('GameScoreComponent', () => {
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
    it('No players', () => {   
      expect(compiled.querySelector('.player')).toBeNull;
    });
  });

  describe('With players', () => {
    let gs : CricketState;
    let player1 = { name: 'player 1a'};

    it('Player', () => {   
      gs = new CricketState();
      gs.players.push(new PlayerState(player1));
      component.gameState.s = gs;
      fixture.detectChanges();

      expect(compiled.querySelector('.playername').textContent).toEqual(player1.name);
    });
  });

});
