import { ActionObject } from '../lib/Aggregate';

export enum ActionsCricket { addPlayer, startGame, score, endTurn }
export const MAX_PLAYERS = 3;
export const DARTS_IN_TURN = 3;

export class CricketState
{
    createdAt : Date;
    startedAt : Date;
    players : PlayerState[] = [];

    turn : number = 1;

    get round() {
        return Math.ceil(this.turn / this.players.length);
    }

    get activePlayer() {
        return  this.players[(this.turn-1) % this.players.length];
    }

    activeturn : TurnState;
}

export class PlayerState
{
    constructor(private player) {}

    get name() : string { return this.player.name; }
}

export class TurnState
{
    dartsThrown = 0;

    get dartsremaining() : number  {
        return DARTS_IN_TURN - this.dartsThrown; 
    }
}

export class Cricket implements ActionObject {
    public enabledActions: any[] = [];
    public state: CricketState = new CricketState();
    
    convertAction(command) {
        return ActionsCricket[command];
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ActionsCricket.addPlayer];
    }

    addPlayer(event)
    {
        this.state.players.push(new PlayerState(event.player));
        
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
       return this.state.players.length === MAX_PLAYERS; 
    }

    startGame(event)
    {
        this.state.startedAt = event.startedAt;
        this.enabledActions = [ActionsCricket.score, ActionsCricket.endTurn];
        this.state.activeturn = new TurnState();
    }

    score(event)
    {
        this.state.activeturn.dartsThrown += 1;
    }

    endTurn(event)
    {
        this.state.activeturn = new TurnState();
        this.state.turn += 1;
    }
}