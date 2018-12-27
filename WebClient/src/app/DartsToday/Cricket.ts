import { ActionObject } from '../lib/Aggregate';

export enum ActionsCricket { addPlayer }

class CricketState
{
    createAt : Date;
}

export class Cricket implements ActionObject {
    public enabledActions: any[] = [];
    public gameState: CricketState = new CricketState();
    
    convertAction(command) {
        return ActionsCricket[command];
    }

    initialized(event) {  
        this.gameState.createAt = event.createdAt;

    }
}