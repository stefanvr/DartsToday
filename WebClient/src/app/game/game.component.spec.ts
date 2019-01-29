import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { stubStoreProperty } from '../lib/reduxhelper.example';

import { GameComponent } from './game.component';

import { TurnTrackerComponent } from './turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './players-score/players-score.component';
import { GameScoreComponent } from './game-score/game-score.component'
import { StatisticsComponent } from '../game/statistics/statistics.component';
import { Leg, PlayerCricketScore } from '../DartsToday/CricketGame';
import { StatisticsState } from '../DartsToday/Statistics';
import { PLAYER1 } from '../DartsToday/CricketGame.examples';


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GameComponent,
        TurnTrackerComponent,
        TurnControlCricketComponent,
        PlayersScoreComponent,
        GameScoreComponent,
        StatisticsComponent
      ],
      imports:[NgReduxTestingModule],
      providers: [],
    })
    .compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    let leg = new Leg();
    leg.currentPlayer = new PlayerCricketScore(PLAYER1);
    stubStoreProperty('leg', leg);

    stubStoreProperty('legStatistics', new StatisticsState());
    fixture.detectChanges();
  });

  describe('Component creation:', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    
    it('should render turn tracker', () => {
      expect(compiled.querySelector('app-turn-tracker')).toBeTruthy();
    });
  
    it('should render players score', () => {
      expect(compiled.querySelector('app-players-score')).toBeTruthy();
    });
  
    it('should render game score', () => {
      expect(compiled.querySelector('app-game-score')).toBeTruthy();
    });
  
    it('should render turn control', () => {
      expect(compiled.querySelector('app-turn-control-cricket')).toBeTruthy();
    });

    it('should render statistics', () => {
      expect(compiled.querySelector('app-statistics')).toBeTruthy();
    });
  });
});
