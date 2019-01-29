import { Component, Input } from '@angular/core';
import { Dispatcher } from 'src/app/lib/dispatcher';

import { createCommmand } from 'src/app/app.state';
import { ActionsCricket, DartScore, Leg, PlayerScore } from 'src/app/DartsToday/CricketGame';

@Component({
  selector: 'app-turn-control-cricket',
  templateUrl: './turn-control-cricket.component.html',
  styleUrls: ['./turn-control-cricket.component.scss']
})
export class TurnControlCricketComponent {

  @Input() leg: Leg;
  @Input() dispatcher: Dispatcher;

  get controlsDisabled() {
    return this.leg.actionStartGameEnabled;
  }

  get controlsBackDisabled() : boolean {
    return true;
  }

  get controlsEnTurnDisabled() : boolean  {
    return this.controlsDisabled || !this.leg.actionEndTurnEnabled;
  }

  controlsScoreDisabled(score) : boolean {
    return this.controlsDisabled || !this.leg.actionScoreEnabled || this.leg.currentPlayer.state[score] === PlayerScore.closed;
  }

  controlsScoreState(score) {
    return PlayerScore[this.leg.currentPlayer.state[score]];
  }

  /*back() {
    this.dispatcher.dispatch(createCommmand(ActionsCricket.undo));
  }*/

  endTurn() {
    this.dispatcher.dispatch(createCommmand(ActionsCricket.endTurn));
  }

  hitSingle(value) {
    this.dispatcher.dispatch(createCommmand(ActionsCricket.score, { score:value, multiplier: DartScore.single}));
  }

  hitDouble(value) {
    this.dispatcher.dispatch(createCommmand(ActionsCricket.score, { score:value, multiplier: DartScore.double}));
  }

  hitTriple(value) {
   this.dispatcher.dispatch(createCommmand(ActionsCricket.score, { score:value, multiplier: DartScore.triple}));
  }

  mis() {
    this.dispatcher.dispatch(createCommmand(ActionsCricket.score, { score: DartScore.miss}));
  }
}
