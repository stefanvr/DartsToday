import { 
    NO_PLAYERS,
   
    SCORES_OPTIONS,
    NO_SCORE,
    
    GameScore,
    PlayerScore,
    CricketScore,
    
    Leg,
    PlayerCricketScore,
    MAX_DART_IN_TURN
} from './CricketGame'

export class Cricket {  
    constructor(public leg: Leg) { }
    
    startGame(gameConfiguration)
    {
        this.leg.actionStartGameEnabled = false;
        this.leg.actionScoreEnabled = true;
        this.leg.actionEndTurnEnabled = true;
        this.leg.startedAt = gameConfiguration.startedAt;

        gameConfiguration.selectedPlayers.forEach(player => {
            this.leg.players.push(new PlayerCricketScore(player));
        });

        this.leg.currentPlayer = this.leg.players[0];
    }

    score(dartHit)
    {
        let leg = this.leg;
        if (!leg.actionScoreEnabled) return;

        let currentHits = leg.currentPlayer.score[dartHit.score];
        let extraHits = this.extraHits(currentHits, dartHit.multiplier);
 
        leg.turnScore.dartsThrown.push(dartHit);
        let dartBonus = this.dartBonus(leg, dartHit.score, extraHits);
        
        leg.turnScore.bonus += dartBonus;
      
        let score = this.activePlayerScore(leg, dartHit);
        leg.currentPlayer.score[dartHit.score] = score
        leg.currentPlayer.bonus += dartBonus;

        leg.game.score[dartHit.score] = this.gameScore(leg, dartHit.score);

        leg.players.forEach(player => {
            player.state[dartHit.score] = this.playerScoreState(leg.game.score, player.score, dartHit.score);
        });

        this.leg.actionScoreEnabled = this.scoreActionEnabled(
                                          this.leg.turnScore.dartsThrown.length, 
                                          this.leg.actionStartGameEnabled, 
                                          this.leg.actionEndTurnEnabled);
    }

    endTurn()
    {
        this.leg.winner = this.winner(this.leg);
        if(!this.leg.winner)
        {  
            this.leg.turn += 1;
            this.leg.turnScore = { dartsThrown: [],  bonus:0};
            this.leg.currentPlayer = this.leg.players[(this.leg.turn-1) % this.leg.players.length]
            this.leg.actionScoreEnabled = true;
        }
        else
        {
            this.leg.actionEndTurnEnabled = false;
            this.leg.actionScoreEnabled = false;
        }
    }

    private activePlayerScore(state : Leg, dartHit) {
        return Math.min(state.currentPlayer.score[dartHit.score] + dartHit.multiplier, CricketScore.closed);
    }
    
    private gameScore(state : Leg, option) {
        switch(this.numberOfPlayersWithClosedScoreOption(option, state.players)) {
            case NO_PLAYERS: { return GameScore.open; }
            case state.players.length: { return GameScore.closed; }
            default: { return GameScore.playerToScore; }
        }
    }

    private extraHits(currentHits, dartHits) {
        return Math.max((currentHits + dartHits) - CricketScore.closed, 0);    
    }

    private dartBonus(state : Leg, option, bonusHits) {
        if (option === NO_SCORE) return 0;
        return (state.game.score[option] != GameScore.closed) ? option * bonusHits : 0;
    }

    private winner(update) {
        return this.hasClosedAllscore(update.currentPlayer.score) &&
               this.hasWinningBonus(update.players, update.currentPlayer) 
                       ? update.currentPlayer.player 
                       : null;
    }
    private hasClosedAllscore(score)
    {   
        let closedAll = true;
        SCORES_OPTIONS.forEach(scoreOption => { 
            closedAll = closedAll && (score[scoreOption] == CricketScore.closed) 
        });
        
        return closedAll;
    }

    private hasWinningBonus(players, activePlayer)
    {
      let winningBonus = true;
      players.forEach(player => { 
        winningBonus = winningBonus && activePlayer.bonus >= player.bonus;
      });
      
      return winningBonus;
    }

    private scoreActionEnabled(dartsThrowns, startEnabled, endEnabled) {
        return !startEnabled && endEnabled && (dartsThrowns < MAX_DART_IN_TURN) ;
    }

    private playerScoreState(gameScore, playerScore, option) {
        if (gameScore[option] === GameScore.closed ) return PlayerScore.closed;
        if (gameScore[option] === GameScore.playerToScore) {
          return playerScore[option]  === CricketScore.closed ?  PlayerScore.score : PlayerScore.target
        }
        return PlayerScore.open;
    } 

    private numberOfPlayersWithClosedScoreOption(option, players) {
        let playersClosedScore = 0;
        
        players.forEach(player => {
            playersClosedScore += (player.score[option] == CricketScore.closed) ? 1 : 0;
        });
       
        return playersClosedScore;
    }
}