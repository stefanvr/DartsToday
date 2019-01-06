import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

import { TurnTrackerComponent } from './turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './players-score/players-score.component';
import { GameScoreComponent } from './game-score/game-score.component'

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
        GameScoreComponent
      ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  describe('Component creation:', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should render game type', () => {
      expect(compiled.querySelector('#header').textContent).toContain('DartsToday');
    });
  
    it('should render turn tracker', () => {
      expect(compiled.querySelector('app-turn-tracker')).toBeTruthy();
    });
  
    it('should render players score', () => {
      expect(compiled.querySelector('app-players-score')).toBeTruthy();
    });
  
    it('should render game score', () => {
      expect(compiled.querySelector('app-players-score')).toBeTruthy();
    });
  
    it('should render turn control ticket', () => {
      expect(compiled.querySelector('app-turn-control-cricket')).toBeTruthy();
    });
  });
});
