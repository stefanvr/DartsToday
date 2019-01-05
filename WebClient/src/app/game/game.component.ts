import { Component } from '@angular/core';
import { AggregateService, ServiceState } from '../lib/aggregate.service'

export class GameState extends ServiceState { }
export class GameService extends AggregateService { }

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent { }
