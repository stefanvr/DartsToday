import { Component } from '@angular/core';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {

  //gameState: GameState; 

  constructor() {///gameService: GameService) {
    //this.gameState = gameService.state;
  }

  scoreState(score) {
    return "";
    /*if(!this.gameState.s) return  "";

    return this.gameState.s.gameScore(score) === GameScore.closed 
               ? "closed"
               : "";*/
  }

  scoreStateLabel(score) {
    return "";
    /*if(!this.gameState.s) return  "";

    return this.gameState.s.gameScore(score) === GameScore.closed 
               ? ""
               : (score === BULL ? "Bull" : score) ;*/
  }

  playerwon() {
    return "";
    /*
    if(!this.gameState.s) return  "";

    return this.gameState.s.playerWon() ? "Win: " + this.gameState.s.activePlayer.name : ""; */
  }
}