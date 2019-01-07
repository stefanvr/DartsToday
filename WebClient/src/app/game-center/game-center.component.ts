import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import  * as DateTime from '../lib/datetime';
import { AggregateService, ServiceState } from '../lib/aggregate.service'

import { GameService } from '../game/game.component'

import { GameConfiguration } from '../DartsToday/GameConfiguration';
import { ActionsCricket, Cricket } from '../DartsToday/Cricket'

@Injectable({
  providedIn: 'root',
})
export class GameConfigService extends AggregateService { }

@Component({
  selector: 'app-game-center',
  templateUrl: './game-center.component.html',
  styleUrls: ['./game-center.component.scss']
})
export class GameCenterComponent  {
  state: ServiceState;

  constructor(private gameService: GameService, 
              private gameConfigService : GameConfigService,
              private router: Router) {
    this.gameConfigService.intializeNew(DateTime.now(), GameConfiguration);
    this.state = this.gameConfigService.state;
  }

  get selectedPlayers() {
    return this.state.s.selectedPlayers;
  }

  get selectedGameType() {
    return this.state.s.selectedGameType;
  }

  start() {
    this.gameService.intializeNew(DateTime.now(), Cricket);

    this.selectedPlayers.forEach(player => {
      this.gameService.execute({action: ActionsCricket.addPlayer, player: player});
    });
    this.gameService.execute({action: ActionsCricket.startGame, startedAt: DateTime.now()});

    this.router.navigate(['/game']);
  }
 }
