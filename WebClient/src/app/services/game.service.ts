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
  private game: Aggregate = null;

  constructor() { }

  get state() : any {
    return this._state;
  }

  intializeNew(game) {
    this.game = game;
    this._state.s = this.game.state();
  }

  executeScenario(scenario: any) {
    this.game = Aggregate.CreateFromEs(scenario, Cricket);
    this._state.s = this.game.state();
  }

  execute(command: any) {
    if (!this.game) { 
      console.log('Unable to execute command as game has not been initialized');
      return;
    }
    
    this.game.execute(command);
    this._state.s = this.game.state();
  }

  commandEnabled(command){
    return this.game ? this.game.enabledActions().includes(command) : false;
  }
}