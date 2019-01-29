import { MAX_DART_IN_TURN } from './CricketGame';

export class StatisticsState {
   currentPLayer = 0;
   players = [];

   dartsThrown = 0;
}

export class PlayerStatistics {
    constructor(public player) {}
    
    dartsThrown = 0;
    dartsHit = 0;
    avg = 0;
}

export class Statistics {   

    constructor(public state: StatisticsState) { }

    startGame(gameConfiguration)
    {
      gameConfiguration.selectedPlayers.forEach(player => {
        this.state.players.push(new PlayerStatistics(player));
      });
    }
    
    score(dartHit)
    {
        let currenPlayer = this.state.players[this.state.currentPLayer];
 
        currenPlayer.dartsThrown += 1;
    
        if (dartHit.score > 0)
        {
          currenPlayer.dartsHit += 1;
        }

        currenPlayer.avg = this.average(currenPlayer.dartsHit, currenPlayer.dartsThrown);
        this.state.dartsThrown++;
    }

    endTurn()
    {
      let currenPlayer =  this.state.players[this.state.currentPLayer]
      currenPlayer.dartsThrown += MAX_DART_IN_TURN - this.state.dartsThrown;
      currenPlayer.avg = this.average(currenPlayer.dartsHit, currenPlayer.dartsThrown);

      this.state.currentPLayer = (this.state.currentPLayer+1) % this.state.players.length;
      this.state.dartsThrown = 0;
    }

    private average(dartsHit, dartsThrown) {
      return Math.round((dartsHit / dartsThrown) * 100) / 100;
    }
}