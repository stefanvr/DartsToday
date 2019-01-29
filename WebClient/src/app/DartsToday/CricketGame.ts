export const NO_PLAYERS = 0;
export const MAX_DART_IN_TURN = 3;
export const NO_SCORE = 0;
export const BULL = 25;
export const SCORES_OPTIONS = [BULL, 20, 19, 18, 17, 16, 15];

export enum  DartThrown { first=1, second=2, third=3 };
export enum CricketScore { noHit, oneHit, twoHits, closed };
export enum DartScore { miss = 0 , single = 1, double = 2, triple = 3};
export enum GameScore { open, playerToScore, closed };
export enum PlayerScore { open, score, target, closed };

export enum ActionsCricket { undo/*==CMD_UNDO*/, addPlayer, startGame, score, endTurn }

export class CricketScoreState {
    score =  {  }

    constructor() {
        SCORES_OPTIONS.forEach(option => {
            this.score[option] = GameScore.open;
        });
    }
}

export class PlayerCricketScore { 
    score =  { }
    state =  { }
    bonus = 0;
    name: string;
    
    constructor(public player) {
        this.name = this.player.name;
     
        SCORES_OPTIONS.forEach(option => {
            this.score[option] = CricketScore.noHit;
        });

        SCORES_OPTIONS.forEach(option => {
            this.state[option] = PlayerScore.open;
        });
    }
}

export class Leg  {
    startedAt;

    turn = 1;
    players: PlayerCricketScore[] = [];
    game = new CricketScoreState();
    turnScore = { dartsThrown: [],  bonus:0 };
    winner = null;

    currentPlayer : PlayerCricketScore;
    
    // not used yet, function should be converted to attribute
    get round() {
        return Math.ceil(this.turn / this.players.length) ;
    }
    
    // actions
    actionEndTurnEnabled = false;
    actionScoreEnabled = false;
    actionStartGameEnabled = true;
}