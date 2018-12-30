import { Component } from '@angular/core';
import { GameService, ServiceState } from '../../services/game.service'
import { ActionsCricket, GameScore, CricketScore } from '../../DartsToday/Cricket'

@Component({
  selector: 'app-turn-control-cricket',
  templateUrl: './turn-control-cricket.component.html',
  styleUrls: ['./turn-control-cricket.component.scss']
})
export class TurnControlCricketComponent {
  gameState: ServiceState; 

  constructor(private gameService: GameService) {
    this.gameState = gameService.state;
  }

  get controlsDisabled() {
    return !this.gameState.s || this.gameState.s.playerWon();
  }

  get controlsgenericScoreDisabled() {
    return this.controlsDisabled 
      || !this.gameService.commandEnabled(ActionsCricket.score);
  }

  controlsScoreDisabled(score) {
    return this.controlsgenericScoreDisabled 
      || this.controlsScoreState(score) == "closed";
  }

  controlsScoreState(score) {
    if (!this.gameState.s) return "";   
    if (this.gameState.s.gameScore(score) === GameScore.closed ) return "closed";
    if (this.gameState.s.gameScore(score) === GameScore.playerToScore) {
      return this.gameState.s.activePlayer.score[score] === CricketScore.closed ?  "score" : "open";
    }
    return "";
  }

  back() {
    this.gameService.execute({action: "back"});
  }

  endTurn() {
    this.gameService.execute({action: ActionsCricket.endTurn});
  }

  hitSingle(value) {
    this.gameService.execute({action: ActionsCricket.score, score:value, multiplier:1});
  }

  hitDouble(value) {
    this.gameService.execute({action: ActionsCricket.score, score:value, multiplier:2});
  }

  hitTriple(value) {
   this.gameService.execute({action: ActionsCricket.score, score:value, multiplier:3});
  }

  mis() {
    this.gameService.execute({action: ActionsCricket.score, score:0});
  }
}
