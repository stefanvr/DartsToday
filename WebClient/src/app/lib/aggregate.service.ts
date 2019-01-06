import { Aggregate } from './aggregate'

export class ServiceState {
  public s: any;
}

export class AggregateService {
  private _state: ServiceState = new ServiceState();
  private aggregate: Aggregate = null;

  constructor() { }

  get state() : any {
    return this._state;
  }

  intializeNew(aggregate) {
    this.aggregate = aggregate;
    this._state.s = this.aggregate.state();
  }

  executeScenario(scenario: any, type) {
    this.aggregate = Aggregate.CreateFromEs(scenario, type);
    this._state.s = this.aggregate.state();
  }

  execute(command: any) {
    if (!this.aggregate) { 
      console.log('Unable to execute command as aggregate has not been initialized');
      return;
    }
    
    this.aggregate.execute(command);
    this._state.s = this.aggregate.state();
  }

  commandEnabled(command){
    return this.aggregate ? this.aggregate.enabledActions().includes(command) : false;
  }
}