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
}