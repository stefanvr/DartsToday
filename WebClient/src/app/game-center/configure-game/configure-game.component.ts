import { Component, Input } from '@angular/core';
import { GameConfiguratieState } from 'src/app/DartsToday/GameConfiguration';

@Component({
  selector: 'app-configure-game',
  templateUrl: './configure-game.component.html',
  styleUrls: ['./configure-game.component.scss']
})
export class ConfigureGameComponent {
  @Input() gameConfig : GameConfiguratieState;

  get gameType() {
    return this.gameConfig.selectedGameType
  };
}
