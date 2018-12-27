import { ActionObject } from '../lib/Aggregate';

export enum ActionsCricket { addPlayer }

class CricketState
{
    createAt : Date;
    players : PlayerState[] = [];
}

class PlayerState
{
    constructor(private player) {}

    get name() : string { return this.player.name; }
}

export class Cricket implements ActionObject {
    public enabledActions: any[] = [];
    public gameState: CricketState = new CricketState();
    
    convertAction(command) {
        return ActionsCricket[command];
    }

    initialized(event) {  
        this.gameState.createAt = event.createdAt;
        this.enabledActions = [ActionsCricket.addPlayer];
    }

    addPlayer(event)
    {
        this.gameState.players.push(new PlayerState(event.player));
    }
}