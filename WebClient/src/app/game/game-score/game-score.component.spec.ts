import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';
import { AggregateService } from '../../lib/aggregate.service'

import {GAME_STATES_GAME, PLAYER1_WIN_GAME, PLAYER1 } from '../../DartsToday/CricketGameExamples'
import { Cricket } from 'src/app/DartsToday/Cricket';

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ],
      providers: [AggregateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initial state:', () => {
    it('ScoreState class post fix to be: ""', () => {
      expect(component.scoreState(20)).toBe("");
    });

    it('ScoreState class post fix to be: ""', () => {
      expect(component.scoreStateLabel(20)).toBe("");
    });

    it('playerwon test to be: ""', () => {
      expect(component.playerwon()).toBe("");
    });
  });  

  describe('With game state:', () => {
    beforeEach(() => {
      let service = <AggregateService>TestBed.get(AggregateService);
      service.executeScenario(GAME_STATES_GAME, Cricket);
      fixture.detectChanges();
    });

    it('Open score, ScoreState class post fix to be: ""', () => {
      expect(component.scoreState(18)).toBe("");
    });

    it('Open score, ScoreState label fix to be: ""', () => {
      expect(component.scoreStateLabel(18)).toBe(18);
    });

    it('Player to score, ScoreState class post fix to be: ""', () => {
      expect(component.scoreState(19)).toBe("");
    });

    it('Player to score, ScoreState label to be: ""', () => {
      expect(component.scoreStateLabel(19)).toBe(19);
    });

    it('Closed score, ScoreState class post fix to be: ""', () => {
      expect(component.scoreState(20)).toBe("closed");
    });

    it('Closed score, ScoreState label to be: ""', () => {
      expect(component.scoreStateLabel(20)).toBe("");
    });

    it('Opne score, ScoreState to be: "Bull"', () => {
      expect(component.scoreStateLabel(25)).toBe("Bull");
    });

    it('playerwon test to be: ""', () => {
      expect(component.playerwon()).toBe("");
    });

    it('playerwon test to be: ""', () => {
      expect(component.playerwon()).toBe("");
    }); 
  });  

  describe('With player1 won game state:', () => {
    beforeEach(() => {
      let service = <AggregateService>TestBed.get(AggregateService);
      service.executeScenario(PLAYER1_WIN_GAME, Cricket);
      fixture.detectChanges();
    });

    it('playerwon test to be: ""', () => {
      expect(component.playerwon()).toEqual("Win: " + PLAYER1.name);
    });
  });
});