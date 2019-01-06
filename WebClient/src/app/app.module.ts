import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCenterComponent, GameConfigService } from './game-center/game-center.component';
import { GameComponent, GameService } from './game/game.component';

import { TurnTrackerComponent } from './game/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './game/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './game/players-score/players-score.component';
import { GameScoreComponent } from './game/game-score/game-score.component'


@NgModule({
  declarations: [
    AppComponent,
    GameCenterComponent,
    GameComponent,
    TurnTrackerComponent,
    TurnControlCricketComponent,
    PlayersScoreComponent,
    GameScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
