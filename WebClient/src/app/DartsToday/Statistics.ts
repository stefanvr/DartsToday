export enum ActionsStatistics  { undo/*==CMD_UNDO*/ }

export class StatisticsState {
   createdAt = null;
   players = [];
   public log = true;
}

export class PlayerStatistics {
    constructor(public player) {}
    dartsThrown = 0;
    dartsHit = 0;
}

export class Statistics {
    public enabledActions: any[] = [];
    public state = new StatisticsState();
    private mapPlayer = {};

    convertAction(command) {
        return ActionsStatistics[command];
    }

    initialized(event) {  
        this.state = new StatisticsState();
        this.mapPlayer = {};

        this.state.createdAt = event.createdAt;
        this.enabledActions = [];
    }

    eventHandler_addPlayer(event)
    {
       let pstat =new PlayerStatistics(event.player);
       this.state.players.push(pstat);
       this.mapPlayer[event.player.id] =pstat
    }
    
    eventHandler_score(event)
    {
        let pl = this.mapPlayer[event.playerId];

        pl.dartsThrown += 1;
       
       if (event.score > 0)
       {
        pl.dartsHit += 1;
       }
    }

    eventHandler_endTurn(event)
    {
       let pl = this.mapPlayer[event.playerId];
       pl.dartsThrown += event.noScore;
    }
}