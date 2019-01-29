import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { stubStoreProperty } from '../lib/reduxhelper.example';

import  * as DateTime from '../lib/datetime';

import { IAppState, createCommmand } from '../app.state'

import { GameConfiguratieState } from '../DartsToday/GameConfiguration'
import { ActionsCricket, PlayerCricketScore } from '../DartsToday/CricketGame'

@Component({
  selector: 'app-game-center',
  templateUrl: './game-center.component.html',
  styleUrls: ['./game-center.component.scss']
})
export class GameCenterComponent  implements OnDestroy {

  gameConfig: GameConfiguratieState;
  subGameConfig;
  _selectedPlayers;

  selectedPlayers(data) {
    this._selectedPlayers = data;
  }

  constructor(
    private router: Router, 
    private store: NgRedux<IAppState>
  ) {
    this.subGameConfig = store.select<GameConfiguratieState>('gameConfig') 
    .subscribe(gameConfig => this.gameConfig = gameConfig);
   }

  start() {
    this.store.dispatch(createCommmand(
      ActionsCricket.startGame, 
      { ...this.gameConfig }
    ));
   
    this.router.navigate(['/game']);
  }

  ngOnDestroy() {                   
    this.subGameConfig.unsubscribe(); 
  }  
}
 
