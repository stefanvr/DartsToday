import  * as DateTime from '../lib/datetime';
import { Aggregate, ActionObject } from '../lib/aggregate';
import { AggregateService } from '../lib/aggregate.service'

import { ActionsCricket, Cricket } from '../DartsToday/Cricket'

export enum ActionsGameConfig { undo/*==CMD_UNDO*/, start }

export class GameConfiguratieState {
  createdAt = null;
  selectedGameType = "Cricket";
  selectedPlayers = [{ id:"1", name: 'player 1'}, { id:"2", name: 'player 2'}];
}

export class GameConfiguration implements ActionObject {
    public enabledActions: any[] = [];
    public state = new GameConfiguratieState();

    convertAction(command) {
        return ActionsGameConfig[command];
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ActionsGameConfig.start];
    }

    start(event) {

    }
}
