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
    if (!this.gameState.s || !this.gameState.s.turnState)  return "";

    return this.gameState.s.turnState.turn;
  }

  dartState(dart : number) {
    if (!this.gameState.s || !this.gameState.s.turnState)  return "";

    return  this.gameState.s.turnState.dart[dart] == DartState.noscore ? "turn-attempt" : "turn-done";
  }
}