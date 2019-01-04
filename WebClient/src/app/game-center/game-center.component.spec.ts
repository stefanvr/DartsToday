import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameCenterComponent } from './game-center.component';

import { GameService } from '../services/game.service'

describe('GameCenterComponent', () => {
  let component: GameCenterComponent;
  let fixture: ComponentFixture<GameCenterComponent>;
  let compiled: any;
  let gameService : GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        GameCenterComponent
     ],
     providers: [GameService],
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
      expect(component.selectedPlayers).toEqual([{ name: 'player 1' },{ name: 'player 2' }]);
    });
  });

  describe('Button wiring', () => {
    beforeEach(() => {
      gameService =  TestBed.get(GameService);
      spyOn(gameService, 'execute').and.callFake(() => {});
      fixture.detectChanges();
    });

    xit('Button endTurn', () => {
      let button = fixture.debugElement.nativeElement.querySelector("#start");
      button.click();
      expect(gameService.execute).toHaveBeenCalledTimes(3);
    });
  });
});