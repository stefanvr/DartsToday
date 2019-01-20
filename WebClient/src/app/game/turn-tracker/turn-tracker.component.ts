import { Component } from '@angular/core';

@Component({
  selector: 'app-turn-tracker',
  templateUrl: './turn-tracker.component.html',
  styleUrls: ['./turn-tracker.component.scss']
})
export class TurnTrackerComponent {
  //gameState: GameState; 

  constructor() { //gameService: GameService) {
    //this.gameState = gameService.state;
  }

  get turn() {
    //if (!this.gameState.s)  return "";

    return "";//"Turn: " + this.gameState.s.round;
  }

  dartState(dart : number) {
    //if (!this.gameState.s)  return "";

    return "";// dart >= this.gameState.s.activeturn.dartsThrown  ? "turn-attempt" : "turn-done";
  }

  get turnBonus() {
    //if (!this.gameState.s)  return "";

    return ""; //this.gameState.s.activeturn.turnBonus;
  }
}