import { ActionObject } from '../lib/Aggregate';

export enum ActionsCricket { addPlayer, startGame }
export const MAX_PLAYERS = 3;

export class CricketState
{
    createdAt : Date;
    startedAt : Date;
    players : PlayerState[] = [];

    turn : number = 1;

    get round() {
        return Math.ceil(this.turn / this.players.length);
    }
}

export class PlayerState
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
        this.gameState.createdAt = event.createdAt;
        this.enabledActions = [ActionsCricket.addPlayer];
    }

    addPlayer(event)
    {
        this.gameState.players.push(new PlayerState(event.player));
        
        if (this.isMaxPLayer())
        {
          this.enabledActions = [ActionsCricket.startGame];
        }
        else
        { 
          this.enabledActions = [ActionsCricket.addPlayer, ActionsCricket.startGame];
        }
    }

    private isMaxPLayer()
    {
       return this.gameState.players.length === MAX_PLAYERS; 
    }

    startGame(event)
    {
        this.gameState.startedAt = event.startedAt;
    }
}