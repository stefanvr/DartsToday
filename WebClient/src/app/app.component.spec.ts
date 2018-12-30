import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TurnTrackerComponent } from './components/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './components/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './components/players-score/players-score.component';
import { GameScoreComponent } from './components/game-score/game-score.component'

import { GameService } from './services/game.service'

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TurnTrackerComponent,
        TurnControlCricketComponent,
        PlayersScoreComponent,
        GameScoreComponent
      ],
      providers: [GameService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  describe('Component creation:', () => {
    it('should create the app', () => {
      expect(app).toBeTruthy();
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

  describe('State:', () => {
    it(`should have title 'DartsToday'`, () => {
      expect(app.title).toEqual('DartsToday');
    });
  });
});
