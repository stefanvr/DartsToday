import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameCenterComponent } from './game-center/game-center.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: 'game-center', component: GameCenterComponent },
  { path: 'game', component: GameComponent },
  { path: '',   redirectTo: '/game-center', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
