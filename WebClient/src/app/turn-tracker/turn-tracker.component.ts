import { Component } from '@angular/core';
import { GameService, ServiceState } from '../services/game.service'
import { DartState } from '../DartsToday/GameState';

@Component({
  selector: 'app-turn-tracker',
  templateUrl: './turn-tracker.component.html',
  styleUrls: ['./turn-tracker.component.scss']
})

export class TurnTrackerComponent {
  gameState: ServiceState; 

  constructor(private gameService: GameService) {
    this.gameState = gameService.state;
  }

  get turn() {
    if (!this.gameState.s)  return "";

    return this.gameState.s.round;
  }

  dartState(dart : number) {
    if (!this.gameState.s || !this.gameState.s.activeturn)  return "";

    return  dart >= this.gameState.s.activeturn.dartsThrown  ? "turn-attempt" : "turn-done";
  }
}