import { Component, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Dispatcher } from '../lib/dispatcher';
import { IAppState } from '../app.state';

import { Leg } from '../DartsToday/CricketGame';
import { StatisticsState } from '../DartsToday/Statistics';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy { 
  dispatcher : Dispatcher;
  leg: Leg;
  legStatistics: StatisticsState;
  
  sublegStatistics;
  subLeg;

  constructor(
    private store: NgRedux<IAppState>
    ) { 
      this.dispatcher = <Dispatcher>store;

      this.subLeg = store.select<Leg>('leg') 
      .subscribe(leg => this.leg = leg);
      this.sublegStatistics = store.select<StatisticsState>('legStatistics') 
      .subscribe(legStatistics => this.legStatistics = legStatistics);
  }
   
  ngOnDestroy() {                   
    this.sublegStatistics.unsubscribe(); 
    this.sublegStatistics.unsubscribe(); 
  }  
}
