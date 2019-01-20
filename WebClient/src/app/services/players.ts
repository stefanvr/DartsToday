export enum ActionsPlayers { undo/*==CMD_UNDO*/, newPlayer, deletePlayer }


export class PlayersState {
  createdAt = null;
  uniquePlayers = [];
}

export class Players {
    public enabledActions: any[] = [];
    public state = new PlayersState();

    convertAction(command) {
        return ActionsPlayers[command];
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ActionsPlayers.newPlayer];
    }

    newPlayer(event) {
      let newPLayer = this.clone(event.player);
      newPLayer.canBeRemoved = true;    

      this.state.uniquePlayers.push(newPLayer);
      this.enabledActions = [ActionsPlayers.newPlayer, ActionsPlayers.deletePlayer];
    }

    deletePlayer(event) {
        let ps = [];
        this.state.uniquePlayers.forEach((p) => {
           if (p.id != event.player.id) { ps.push(event.player); }
        });
        this.state.uniquePlayers = ps;

        this.state.uniquePlayers.length > 0
           ? this.enabledActions = [ActionsPlayers.newPlayer, ActionsPlayers.deletePlayer]
           : this.enabledActions = [ActionsPlayers.newPlayer];  
    }

    eventHandler_addPlayer(event){
        this.state.uniquePlayers.forEach((p) => {
            if (p.id == event.player.id) { p.canBeRemoved = false; }
         });
    }

    private clone(object:any)
    {
      return JSON.parse(JSON.stringify(object));  
    }
}