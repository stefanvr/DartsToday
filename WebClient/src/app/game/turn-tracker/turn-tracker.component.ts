import { Component, Input } from '@angular/core';
import { Leg , DartThrown } from 'src/app/DartsToday/CricketGame';

export const DART_HIT_ATTEMPT = "turn-attempt"
export const DART_HIT = "turn-done"

export function EnumDartThrown(constructor: Function) {
  constructor.prototype.DartThrown = DartThrown;
}

@Component({
  selector: 'app-turn-tracker',
  templateUrl: './turn-tracker.component.html',
  styleUrls: ['./turn-tracker.component.scss']
})
@EnumDartThrown
export class TurnTrackerComponent { 
  @Input() leg: Leg;
  
  get dartsThrown() {
    return this.leg.turnScore.dartsThrown.length
  };

  get turn() {
    return "Turn: " + this.leg.turn;
  }
   
  dartState(dart : number) {
    return dart >  this.dartsThrown  ? DART_HIT_ATTEMPT : DART_HIT;
  }

  get bonus() {
    return this.leg.turnScore.bonus;
  }
}