import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameConfiguratieState } from 'src/app/DartsToday/GameConfiguration';

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss']
})
export class SelectPlayersComponent {
  @Input() gameConfig : GameConfiguratieState;
  @Output() selectedPlayers = new EventEmitter<any>();
  
  get availablePlayers() {
    this.selectedPlayers.emit(JSON.stringify(this.gameConfig.selectedPlayers));
    return this.gameConfig.selectedPlayers;
  } 
}
