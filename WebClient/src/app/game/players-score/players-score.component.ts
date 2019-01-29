import { Component, Input } from '@angular/core';
import { CricketScore, Leg } from 'src/app/DartsToday/CricketGame';

export const CURRENT_PLAYER = "active-player";

export const SCORE_SINGLE = "score-single";
export const SCORE_DOUBLE = "score-double";
export const SCORE_TRIPLE = "score-triple";
export const SCORE_CLEAR = "";

@Component({
  selector: 'app-players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})

export class PlayersScoreComponent {
  @Input() leg: Leg;

  get players() {
    return this.leg.players;
  }

  scoreState(scoreOption, player)
  {
    let score = player.score[scoreOption];
    switch(score) {
      case CricketScore.oneHit: { return SCORE_SINGLE; }
      case CricketScore.twoHits: { return SCORE_DOUBLE; }
      case CricketScore.closed: { return SCORE_TRIPLE; }
      case CricketScore.noHit: { return SCORE_CLEAR; }
      default: {
          console.log("Invalid score: '" + score + "'") 
          return SCORE_CLEAR; 
        }
      }
  }

  activePlayer(player) {
    return this.leg.currentPlayer.name == player.name ? "active-player" : "";
  } 
}