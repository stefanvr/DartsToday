import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { AppComponent } from './app.component';

import { GameCenterComponent } from './game-center/game-center.component';
import { SelectPlayersComponent } from './game-center/select-players/select-players.component';
import { ConfigureGameComponent } from './game-center/configure-game/configure-game.component';

import { GameComponent } from './game/game.component';
import { TurnTrackerComponent } from './game/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './game/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './game/players-score/players-score.component';
import { GameScoreComponent } from './game/game-score/game-score.component';
import { StatisticsComponent } from './game/statistics/statistics.component';

describe('AppComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameCenterComponent,
        SelectPlayersComponent,
        ConfigureGameComponent,
        GameComponent,
        TurnTrackerComponent,
        TurnControlCricketComponent,
        PlayersScoreComponent,
        GameScoreComponent,
        StatisticsComponent
      ],
      providers: [{ provide: Router, useValue: routerSpy} ],
      imports: [
        RouterModule.forRoot(routes),
        NgReduxTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('create the app', () => {
    expect(app).toBeTruthy();
  });

  it('on creation navigate to game-center', () => {
     expect(routerSpy.navigate).toHaveBeenCalledWith(['/game-center']);
  });
});
