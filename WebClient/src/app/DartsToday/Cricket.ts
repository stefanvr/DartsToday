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
        this.enabledActions = [ActionsCricket.score];
        this.gameState.activeturn = new TurnState();
    }

    score(event)
    {
        this.gameState.activeturn.dartsThrown += 1;
    }
}