import { Dispatcher } from './dispatcher'
import { Aggregate } from './aggregate'

export class ServiceState {
  public s: any;
}

export class AggregateService {
  private dispatcher: Dispatcher;
  private _state: ServiceState = new ServiceState();
  private aggregate: Aggregate = null;

  constructor(dispatcher: Dispatcher) { 
      this.dispatcher = dispatcher;
  }

  get state() : any {
    return this._state;
  }

  intializeNew(createdAt, type) {
    this.aggregate = Aggregate.CreateNew(createdAt, type);
    this._state.s = this.aggregate.state();

    this.dispatcher.subscibe((event) => { this.receiveEvent(event); } );
    this.aggregate.onEvent.subscribe((event) => { this.publishEvent(event); } );
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

  private publishEvent(event)
  {
    this.dispatcher.publish(event);
  }

  private receiveEvent(event)
  {
    this.aggregate.eventHandler(event);
    this._state.s = this.aggregate.state();
  }
}