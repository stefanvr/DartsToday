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

  back() {
    this.gameService.execute({action: "back"});
  }

  endTurn() {
    this.gameService.execute({action: ActionsCricket.endTurn});
  }

  hitSingle(value) {
    this.gameService.execute({action: ActionsCricket.score, score:value, muliplier:1});
  }

  hitDubble(value) {
    this.gameService.execute({action: ActionsCricket.score, score:value, muliplier:2});
  }

  hitTriple(value) {
   this.gameService.execute({action: ActionsCricket.score, score:value, muliplier:3});
  }

  mis() {
    this.gameService.execute({action: ActionsCricket.score, score:0});
  }
}
