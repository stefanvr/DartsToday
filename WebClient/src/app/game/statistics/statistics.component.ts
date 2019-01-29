import { Component, Input } from '@angular/core';
import { StatisticsState } from 'src/app/DartsToday/Statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  @Input() legStatistics: StatisticsState;

  get players(){
    return this.legStatistics.players;
  }
}
