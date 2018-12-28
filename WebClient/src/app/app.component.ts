import { Component } from '@angular/core';
import { GameService } from './services/game.service'
import { ActionsCricket } from './DartsToday/Cricket'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DartsToday';
 
  constructor(private gameService: GameService) {  }

  display = ""
  start() {
    this.gameService.execute({action: ActionsCricket.startGame, startedAt: new Date(Date.now()).toISOString()});
    this.display = "hide";
  }
}