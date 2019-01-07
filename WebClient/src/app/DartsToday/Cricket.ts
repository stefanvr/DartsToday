import { ActionObject } from '../lib/aggregate';

export enum ActionsCricket { undo/*==CMD_UNDO*/, addPlayer, startGame, score, endTurn }
export const NO_PLAYERS = 0;
export const MAX_PLAYERS = 3;
export const DARTS_IN_TURN = 3;
export const BULL = 25; 
export const SCORES_OPTIONS = [25, 20, 19, 18, 17, 16, 15];

export enum DartScore { miss, single, double, triple };
export enum CricketScore { noHit, one, two, closed };
export enum GameScore { open, playerToScore, closed };

export class CricketState
{
    createdAt : Date;
    startedAt : Date;
    
    players : PlayerState[] = [];

    turn : number = 1;
    activeturn : TurnState;

    get round() {
        return this.hasPlayers 
                   ? Math.ceil(this.turn / this.players.length) 
                   : 0;
    }

    get activePlayer() {
        return  this.hasPlayers
                    ? this.players[(this.turn-1) % this.players.length]
                    : new PlayerState({name: 'Not active'});
    }

    gameScore(score: number) {
        let playersClosedScore = 0;
    
        this.players.forEach(player => {
            playersClosedScore += (player.score[score] == CricketScore.closed) ? 1 : 0;
        });

        switch(playersClosedScore) {
            case NO_PLAYERS: { return GameScore.open; }
            case this.numberOfPlayers: { return GameScore.closed; }
            default: { return GameScore.playerToScore; }
        }
    }   

    playerWon()
    {
        return this.hasClosedAllscores() && this.hasWinningBonus();
    }

    private get hasPlayers() : boolean    {
      return this.players.length > 0;
    }

    private get numberOfPlayers() : number {
       return this.players.length;
    }

    private hasClosedAllscores()
    {
        let closedAll = true;
        let score = this.activePlayer.score;
        SCORES_OPTIONS.forEach(scoreOption => { 
            closedAll = closedAll && (score[scoreOption] == CricketScore.closed) 
        });
     
        return closedAll;
    }

    private hasWinningBonus()
    {
      let winningBonus = true;
      this.players.forEach(player => { 
        winningBonus = winningBonus && this.activePlayer.bonus >= player.bonus;
      });

      return winningBonus;
    }
}

export class PlayerState
{
    constructor(private player) { }

    get name() : string { return this.player.name; }
    get id() : string { return this.player.id; }

    bonus = 0;
    turnBonus = 0;
    score = {
        25 /*BULL*/: CricketScore.noHit,
        20: CricketScore.noHit,
        19: CricketScore.noHit,
        18: CricketScore.noHit,
        17: CricketScore.noHit,
        16: CricketScore.noHit,
        15: CricketScore.noHit
    }
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
        
        if (event.score > 0)
        {
          this.UpdateScore(event.score, event.multiplier)
        }

        if (this.state.activeturn.dartsremaining === 0)
        {
            this.enabledActions = [ActionsCricket.undo, ActionsCricket.endTurn];
        }
        else
        {
            this.enabledActions = [ActionsCricket.undo, ActionsCricket.score, ActionsCricket.endTurn];
        }

        event.playerId = this.state.activePlayer.id;
    }

    private UpdateScore(score, multiplier)
    {
        let currentScore = this.state.activePlayer.score[score];
        let hits = currentScore + multiplier;
        
        // calc state
        if (score > DartScore.miss && currentScore != CricketScore.closed)
        {
          this.state.activePlayer.score[score] = Math.min(hits, CricketScore.closed);
        }

        // calc bonus
        if ((this.state.gameScore(score) != GameScore.closed) ||
           (this.state.gameScore(score) === GameScore.playerToScore)) 
        {
          let bonusHits = Math.max(0, hits-CricketScore.closed);
          let scoreBonus = (bonusHits * score)
          this.state.activePlayer.turnBonus += scoreBonus;
          this.state.activePlayer.bonus += scoreBonus;
        }
    }

    endTurn(event)
    {
        event.playerId = this.state.activePlayer.id;

        if (!this.state.playerWon())
        {
          event.noScore = this.state.activeturn.dartsremaining;
          
          this.state.activePlayer.turnBonus = 0;
          this.state.activeturn = new TurnState();
          this.state.turn += 1;
  
          this.enabledActions = [ActionsCricket.undo, ActionsCricket.score, ActionsCricket.endTurn];         
        }
        else
        {
          event.noScore = 0;
          this.enabledActions = [];         
        }
    }
}