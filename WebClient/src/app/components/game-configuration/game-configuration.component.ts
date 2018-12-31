import { Component } from '@angular/core';

import { Aggregate } from '../../lib/Aggregate'
import { GameService } from '../../services/game.service'

import { ActionsCricket, Cricket } from '../../DartsToday/Cricket'
import { GAME_STATES_GAME } from '../../DartsToday/CricketGameExamples'

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.scss']
})
export class GameConfigurationComponent {

  constructor(private gameService: GameService) {  }

  display = ""
  start() {
    let player1 = { name: 'player 1'};
    let player2 = { name: 'player 2'};
    /*
    this.gameService.intializeNew(Aggregate.CreateNew(new Date(Date.now()).toISOString(), Cricket));
    this.gameService.execute({action: ActionsCricket.addPlayer, player: player1});
    this.gameService.execute({action: ActionsCricket.addPlayer, player: player2});
    this.gameService.execute({action: ActionsCricket.startGame, startedAt: new Date(Date.now()).toISOString()});
    */
   this.gameService.executeScenario(GAME_STATES_GAME);
   
    this.display = "hide";
  }
}
