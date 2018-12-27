import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnTrackerComponent } from './turn-tracker/turn-tracker.component';
import { TurnControlCricketComponent } from './turn-control-cricket/turn-control-cricket.component';

import { GameService } from './services/game.service'

@NgModule({
  declarations: [
    AppComponent,
    TurnTrackerComponent,
    TurnControlCricketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
