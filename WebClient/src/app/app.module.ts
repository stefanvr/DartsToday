import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { GameCenterComponent } from './game-center/game-center.component';
import { GameComponent } from './game/game.component';

import { TurnTrackerComponent } from './game/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './game/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './game/players-score/players-score.component';
import { GameScoreComponent } from './game/game-score/game-score.component'
import { StatisticsComponent } from './game/statistics/statistics.component';
import { SelectPlayersComponent } from './game-center/select-players/select-players.component';
import { ConfigureGameComponent } from './game-center/configure-game/configure-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCenterComponent,
    GameComponent,
    TurnTrackerComponent,
    TurnControlCricketComponent,
    PlayersScoreComponent,
    GameScoreComponent,
    StatisticsComponent,
    ConfigureGameComponent,
    SelectPlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

