import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service'
import { ActionsCricket } from '../DartsToday/Cricket'

@Component({
  selector: 'app-turn-control-cricket',
  templateUrl: './turn-control-cricket.component.html',
  styleUrls: ['./turn-control-cricket.component.scss']
})
export class TurnControlCricketComponent {

  constructor(private gameService: GameService) {}

  reset() {
    console.log('reset');
  }

  endTurn() {
    console.log('endTurn');
    this.gameService.execute({action: ActionsCricket.endTurn});
  }

  hitSingle(value) {
    console.log('single: ' + value);
  }

  hitDubble(value) {
    console.log('dubble: ' + value);
  }

  hitTriple(value) {
    console.log('triple: ' + value);
  }

  mis() {
    console.log('mis');
    this.gameService.execute({action: ActionsCricket.score});
  }
}
