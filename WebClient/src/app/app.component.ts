import { Component } from '@angular/core';
import { GameService } from './services/game.service'
import { Actions } from './DartsToday/GameCricket'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DartsToday';
 
  constructor(private gameService: GameService) {  }
  start() {
    this.gameService.execute({action: Actions.StartGame, startedAt: new Date(Date.now()).toISOString()});
  }
}