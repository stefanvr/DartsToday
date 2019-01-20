import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TurnTrackerComponent } from './game/turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './game/turn-control-cricket/turn-control-cricket.component';
import { PlayersScoreComponent } from './game/players-score/players-score.component';
import { GameScoreComponent } from './game/game-score/game-score.component'
import { StatisticsComponent } from './game/statistics/statistics.component';

import * as DateTime from './lib/datetime'
import { Statistics } from './DartsToday/Statistics';

@NgModule({
  declarations: [
    AppComponent,
    TurnTrackerComponent,
    TurnControlCricketComponent,
    PlayersScoreComponent,
    GameScoreComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(router: Router) {
    router.navigate(['/game-center']);
  }
}

