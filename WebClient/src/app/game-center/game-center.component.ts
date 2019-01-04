import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Aggregate } from '../lib/aggregate';
import { AggregateService, ServiceState } from '../lib/aggregate.service'

import { GameConfiguration } from '../DartsToday/GameConfiguration';
import { ActionsCricket, Cricket } from '../DartsToday/Cricket'

@Component({
  selector: 'app-game-center',
  templateUrl: './game-center.component.html',
  styleUrls: ['./game-center.component.scss']
})
export class GameCenterComponent  {
  private gameConfigService : AggregateService = new AggregateService();
  state: ServiceState;

  constructor(private gameService: AggregateService, private router: Router) {
    this.gameConfigService.intializeNew(Aggregate.CreateNew(new Date(Date.now()).toISOString(), GameConfiguration));
    this.state = this.gameConfigService.state;
  }

  get selectedPlayers() {
    return this.state.s.selectedPlayers;
  }

  get selectedGameType() {
    return this.state.s.selectedGameType;
  }

  start() {
    this.gameService.intializeNew(Aggregate.CreateNew(new Date(Date.now()).toISOString(), Cricket));

    this.selectedPlayers.forEach(player => {
      this.gameService.execute({action: ActionsCricket.addPlayer, player: player});
    });
    this.gameService.execute({action: ActionsCricket.startGame, startedAt: new Date(Date.now()).toISOString()});

    this.router.navigate(['/game']);
  }
 }
