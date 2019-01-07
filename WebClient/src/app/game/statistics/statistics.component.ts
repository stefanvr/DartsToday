import { Component } from '@angular/core';
import { StatisticsService } from '../game.component'
import  * as DateTime from '../../lib/datetime';

import { Statistics } from '../../DartsToday/Statistics'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  statState ;

  constructor(public statisticsSevice: StatisticsService) {
    this.statState = statisticsSevice.state;
   }

  get NofPlayer() {
    if(!this.statState || !this.statState.s) return -1;

    return this.statState.s.players.length;
  }

  get players() {
    if(!this.statState || !this.statState.s) return  [];
    
    return this.statState.s.players;
  }
}
