import { Component } from '@angular/core';
import { GameService, ServiceState } from '../../services/game.service'
import { GameScore } from '../../DartsToday/Cricket'

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {

  gameState: ServiceState; 

  constructor(gameService: GameService) {
    this.gameState = gameService.state;
  }

  scoreState(score) {
    if(!this.gameState.s) return  "";

    return this.gameState.s.gameScore(score) === GameScore.closed ? "closed": "";
  }

  scoreStateLabel(score) {
    if(!this.gameState.s) return  "";

    return this.gameState.s.gameScore(score) === GameScore.closed ? "": 
      (score === 25 ? "Bull" : score) ;
  }

  playerwon() {
    if(!this.gameState.s) return  "";

    return this.gameState.s.playerWon() ? "Win: " + this.gameState.s.activePlayer.name : ""; 
  }
}