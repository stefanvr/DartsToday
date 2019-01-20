export enum ActionsGameConfig { undo/*==CMD_UNDO*/, start }

export class GameConfiguratieState {
  createdAt = null;
  selectedGameType = "Cricket";
  selectedPlayers = [{ id:"1", name: 'player 1'}, { id:"2", name: 'player 2'}];
}

export class GameConfiguration {
    public enabledActions: any[] = [];
    public state = new GameConfiguratieState();

    convertAction(command) {
        return ActionsGameConfig[command];
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ActionsGameConfig.start];
    }
}
