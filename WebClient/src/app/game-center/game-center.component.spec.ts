import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { stubStoreProperty } from '../lib/reduxhelper.example';

import { Router } from '@angular/router';

import { SelectPlayersComponent } from '../game-center/select-players/select-players.component';
import { ConfigureGameComponent } from '../game-center/configure-game/configure-game.component';
import { GameCenterComponent } from './game-center.component';
import { GameConfiguratieState } from '../DartsToday/GameConfiguration';
import { PLAYERS } from '../DartsToday/CricketGame.examples';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionsCricket } from '../DartsToday/CricketGame';

describe('GameCenterComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let component: GameCenterComponent;
  let fixture: ComponentFixture<GameCenterComponent>;
  let compiled: any;

  beforeEach(async(() => {
    MockNgRedux.reset();
  }));
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SelectPlayersComponent,
        ConfigureGameComponent,
        GameCenterComponent
     ],
     providers: [{ provide: Router, useValue: routerSpy} ],
     imports: [NgReduxTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCenterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    stubStoreProperty('gameConfig', new GameConfiguratieState());

    fixture.detectChanges();
  });

  describe('Component creation:', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  }); 

  let spy;
  describe('Button wiring, button endTurn:', () => {
    beforeEach(() => {
      spy = spyOn(MockNgRedux.getInstance(), 'dispatch');
      let button = fixture.debugElement.nativeElement.querySelector("#start");
      button.click();
    });

    it('Send startGame action to store', () => {
      expect(spy).toHaveBeenCalledWith( { 
        type: ActionsCricket[ActionsCricket.startGame], 
        data: { 
          selectedGameType: 'Cricket', 
          selectedPlayers: PLAYERS 
        } 
      });
    });

    it('navigates to /game', () => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/game']);
    });
  });
});
