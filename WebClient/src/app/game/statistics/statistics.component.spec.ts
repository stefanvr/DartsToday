import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as DateTime from '../../lib/datetime'
import { Dispatcher } from '../../lib/dispatcher'

import { StatisticsComponent,  } from './statistics.component';
import { StatisticsService } from '../game.component'
import { Statistics } from '../../DartsToday/Statistics'
import { PLAYER1 } from 'src/app/DartsToday/CricketGame.Examples';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initial state:', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('No players, players to be []', () => {   
      expect(component.players).toEqual([]);
    });
  });

  describe('With addPlayer event received:', () => {
    beforeEach(() => {
      let statisticsService = TestBed.get(StatisticsService);
      statisticsService.intializeNew(DateTime.now() , Statistics);
      let dispatcher = TestBed.get(Dispatcher);
      dispatcher.publish({action: "addPlayer", player: PLAYER1})
      fixture.detectChanges();
    });

    it('Single players, players to be []', () => {   
      expect(component.players.length).toEqual(1);
    });
  });
});
