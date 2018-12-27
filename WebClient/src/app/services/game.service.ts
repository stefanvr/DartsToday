import { Injectable } from '@angular/core';
import { GameState, TurnState } from '../DartsToday/GameState'
import { Cricket, Actions } from '../DartsToday/GameCricket'
import { Aggregate } from '../lib/Aggregate'

@Injectable({
  providedIn: 'root'
})

export class ServiceState {
  public s: any;
}

export class GameService {
  private _state: ServiceState = new ServiceState();
  private game: Aggregate;

  constructor() { }

  get state() : any {
    return this._state;
  }

  execute(command: any) {
    this.EnsureGame();
    this.game.execute(command);
    this._state.s = this.game.state();
  }

  // Future - create game creation options
  testSet(game)
  {
    this.game = game;
  }

  private EnsureGame()
  {
    // Future - create game creation options
    if (!this.game)
    {
      this.game = Aggregate.CreateNew(new Date(Date.now()).toISOString(), Cricket);

      let player1 = { name: 'player 1'};
      let player2 = { name: 'player 2'};
      this.game.execute({action: Actions.AddPlayers, players:[player1, player2]});
    }
  }
}
