import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCenterComponent } from './game-center.component';

import { GameService } from '../game/game.component';
import { PLAYER1, PLAYER2 } from '../DartsToday/CricketGame.examples';

import { Router } from '@angular/router';

describe('GameCenterComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let component: GameCenterComponent;
  let fixture: ComponentFixture<GameCenterComponent>;
  let compiled: any;
  let aggregateService : GameService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GameCenterComponent
     ],
     providers: [{ provide: Router,      useValue: routerSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCenterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  describe('Initial state', () => {
    it('No players, players to be []', () => {   
      expect(component.selectedGameType).toEqual("Cricket");
    });

    it('should create the component', () => {
      expect(component.selectedPlayers).toEqual([PLAYER1, PLAYER2]);
    });
  });

  describe('Button wiring', () => {
    beforeEach(() => {
      aggregateService =  TestBed.get(GameService);
      spyOn(aggregateService, 'execute').and.callFake(() => {});
      fixture.detectChanges();
    });

    it('Button endTurn', () => {
      let button = fixture.debugElement.nativeElement.querySelector("#start");
      button.click();
      expect(aggregateService.execute).toHaveBeenCalledTimes(3);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/game']);
    });
  });
});
