import { Component, Input } from '@angular/core';
import { TurnState, DartState } from '../DartsToday/GameState';

@Component({
  selector: 'app-turn-tracker',
  templateUrl: './turn-tracker.component.html',
  styleUrls: ['./turn-tracker.component.scss']
})
export class TurnTrackerComponent {
  @Input() state: TurnState; 

  get turn() {
    if (!this.state)  return "";

    return this.state.turn;
  }

  dartState(dart : number) {
    if (!this.state)  return "";

    return  this.state.dart[dart] == DartState.noscore ? "turn-attempt" : "turn-done";
  }
}
