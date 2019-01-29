import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as DateTime from '../../lib/datetime'

import { StatisticsComponent,  } from './statistics.component';
import { Statistics, StatisticsState } from '../../DartsToday/Statistics'
import { PLAYER1, PLAYERS } from 'src/app/DartsToday/CricketGame.examples';
import { PlayerCricketScore } from 'src/app/DartsToday/CricketGame';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let statistics;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;

    statistics = new StatisticsState();
    component.legStatistics = statistics;

    PLAYERS.forEach(player => {
      statistics.players.push(new PlayerCricketScore(player));
    });
    component.legStatistics.players 

    fixture.detectChanges();
  });

  describe('With addPlayer event received:', () => {
    it('Single players, players to be []', () => {   
        expect(component.players.length).toEqual(PLAYERS.length);
    });
  });
});
