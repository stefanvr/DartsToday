import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service'

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

  done() {
    console.log('done');
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

  

}
