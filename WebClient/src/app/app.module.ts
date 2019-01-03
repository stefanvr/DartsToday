import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCenterComponent } from './game-center/game-center.component';
import { GameComponent } from './game/game.component';

import { TurnTrackerComponent } from './game/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './game/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './game/players-score/players-score.component';
import { GameScoreComponent } from './game/game-score/game-score.component'

import { GameConfigurationComponent } from './game-center/game-configuration/game-configuration.component';

import { GameService } from './services/game.service'

@NgModule({
  declarations: [
    AppComponent,
    GameCenterComponent,
    GameComponent,
    GameConfigurationComponent,
    TurnTrackerComponent,
    TurnControlCricketComponent,
    PlayersScoreComponent,
    GameScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
