import { Component } from '@angular/core';
import { GameService, ServiceState } from '../../services/game.service'

@Component({
  selector: 'app-players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})

export class PlayersScoreComponent  {

  gameState: ServiceState; 

  constructor(private gameService: GameService) {
    this.gameState = gameService.state;
  }

  get players() {
    if (!this.gameState.s)  return [];
    return this.gameState.s.players;
  }

  scoreState(score)
  {
    switch(score) {
      case 1: { return "score-single"; }
      case 2: { return "score-double"; }
      case 3: { return "score-triple"; }
      case 0: { return ""; }
      default: { return ""; }
      }
  }
}