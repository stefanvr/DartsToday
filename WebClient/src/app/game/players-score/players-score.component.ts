import { Component } from '@angular/core';
import { GameService, GameState } from '../game.component'
import { CricketScore } from '../../DartsToday/Cricket'

@Component({
  selector: 'app-players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})

export class PlayersScoreComponent  {

  gameState: GameState; 

  constructor(gameService: GameService) {
    this.gameState = gameService.state;
  }

  get players() {
    if (!this.gameState.s)  return [];
    return this.gameState.s.players;
  }

  scoreState(scoreOption, player)
  {
    let score = player.score[scoreOption];
    switch(score) {
      case CricketScore.one: { return "score-single"; }
      case CricketScore.two: { return "score-double"; }
      case CricketScore.closed: { return "score-triple"; }
      case CricketScore.noHit: { return ""; }
      default: {
          console.log("Invalid score: '"+ score +"'") 
          return ""; 
        }
      }
  }

  activePlayer(player) {
    return this.gameState.s.activePlayer.name == player.name ? "active-player" : "";
  }
}