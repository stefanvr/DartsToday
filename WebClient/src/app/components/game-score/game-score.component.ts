import { Component } from '@angular/core';
import { GameService, ServiceState } from '../../services/game.service'

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent  {

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