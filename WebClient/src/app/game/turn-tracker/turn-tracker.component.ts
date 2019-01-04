import { Component } from '@angular/core';
import { AggregateService, ServiceState } from '../../lib/aggregate.service'

@Component({
  selector: 'app-turn-tracker',
  templateUrl: './turn-tracker.component.html',
  styleUrls: ['./turn-tracker.component.scss']
})

export class TurnTrackerComponent {
  gameState: ServiceState; 

  constructor(gameService: AggregateService) {
    this.gameState = gameService.state;
  }

  get turn() {
    if (!this.gameState.s)  return "";

    return "Turn: " + this.gameState.s.round;
  }

  dartState(dart : number) {
    if (!this.gameState.s)  return "";

    return  dart >= this.gameState.s.activeturn.dartsThrown  ? "turn-attempt" : "turn-done";
  }

  get turnBonus() {
    if (!this.gameState.s)  return "";

    return "Bonus: " + this.gameState.s.activePlayer.turnBonus;
  }
}