import { Component, Injectable } from '@angular/core';
import { Dispatcher } from '../lib/dispatcher'
import { AggregateService, ServiceState } from '../lib/aggregate.service'

export class GameState extends ServiceState { }

@Injectable({
  providedIn: 'root',
})
export class GameService extends AggregateService { 
  constructor(dispatcher: Dispatcher) { super(dispatcher); }
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService extends AggregateService { 
  constructor(dispatcher: Dispatcher) { super(dispatcher); }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent { }
