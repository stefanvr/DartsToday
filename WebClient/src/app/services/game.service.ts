import { Injectable } from '@angular/core';
import { Cricket, ActionsCricket } from '../DartsToday/Cricket'
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

  executeScenario(scenario: any) {
    this.game = Aggregate.CreateFromEs(scenario, Cricket);
    this._state.s = this.game.state();
  }

  execute(command: any) {
    this.EnsureGame();
    this.game.execute(command);
    this._state.s = this.game.state();
  }

  commandEnabled(command){
    return this.game ? this.game.enabledActions().includes(command) : false;
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
      this.game.execute({action: ActionsCricket.addPlayer, player: player1});
      this.game.execute({action: ActionsCricket.addPlayer, player: player2});
    }
  }
}
