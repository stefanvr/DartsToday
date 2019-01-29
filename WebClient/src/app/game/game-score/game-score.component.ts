import { Component, Input } from '@angular/core';
import {  Leg, GameScore, BULL } from 'src/app/DartsToday/CricketGame';

export const CLOSED_STATE =  "closed"
export const NONE_CLOSED_STATE =  ""
export const NO_LABEL =  ""
export const BULL_LABEL = "Bull"

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {
  @Input() leg: Leg;

  scoreState(option) {
    return this.leg.game.score[option] === GameScore.closed 
               ? CLOSED_STATE
               : NONE_CLOSED_STATE;
  }

  scoreStateLabel(option) {
    return this.leg.game.score[option] === GameScore.closed 
               ? NO_LABEL
               : (option === BULL ? BULL_LABEL : option) ;
  }

  get playerwon() {
    return this.leg.winner ? "Win: " + this.leg.winner.name : "";
  }
}