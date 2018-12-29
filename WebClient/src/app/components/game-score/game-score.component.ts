import { Component } from '@angular/core';
import { GameService, ServiceState } from '../../services/game.service'

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {

  gameState: ServiceState; 

  constructor(private gameService: GameService) {
    this.gameState = gameService.state;
  }

  scoreState() {
    return "x";
  }
}