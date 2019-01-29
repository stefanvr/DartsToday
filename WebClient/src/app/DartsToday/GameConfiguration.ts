export class GameConfiguratieState {
  selectedGameType = "Cricket";
  selectedPlayers = [{ id:"1", name: 'player 1'}, { id:"2", name: 'player 2'}];
}

export class GameConfiguration {
    public state = new GameConfiguratieState();
}
