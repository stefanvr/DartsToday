import { ActionObject } from '../lib/Aggregate';

export enum ActionsCricket { addPlayer, startGame, score, endTurn }
export const MAX_PLAYERS = 3;
export const DARTS_IN_TURN = 3;
export const BULL = 25; 

export enum DartScore { miss, single, double, triple };
export enum CricketScore { noHit, one, two, closed };

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

    score = {
        25 /*BULL*/: CricketScore.noHit,
        20: CricketScore.noHit,
        19: CricketScore.noHit,
        18: CricketScore.noHit,
        17: CricketScore.noHit,
        16: CricketScore.noHit,
        15: CricketScore.noHit 
    }

    bonus = 0;
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
        this.state.activeturn = new TurnState();

        this.enabledActions = [ActionsCricket.score, ActionsCricket.endTurn];
    }

    score(event)
    {
        this.state.activeturn.dartsThrown += 1;

        let currentScore = this.state.activePlayer.score[event.score];
        let hits = currentScore + event.multiplier;
        
        // calc state
        if (event.score > DartScore.miss && currentScore != CricketScore.closed)
        {
          this.state.activePlayer.score[event.score] = Math.min(hits, CricketScore.closed);
        }

        //console.log()
        // calc bonus
        let bonusHits = Math.max(0, hits-CricketScore.closed);
        this.state.activePlayer.bonus += (bonusHits * event.score);


        if (this.state.activeturn.dartsremaining === 0)
        {
            this.enabledActions = [ActionsCricket.endTurn];
        }
    }

    endTurn(event)
    {
        this.state.activeturn = new TurnState();
        this.state.turn += 1;

        this.enabledActions = [ActionsCricket.score, ActionsCricket.endTurn];
    }
}