import { Component } from '@angular/core';

@Component({
  selector: 'app-turn-control-cricket',
  templateUrl: './turn-control-cricket.component.html',
  styleUrls: ['./turn-control-cricket.component.scss']
})
export class TurnControlCricketComponent {
  //gameState: GameState; 

  constructor() { //private gameService: GameService) {
    //this.gameState = gameService.state;
  }

  get controlsDisabled() {
    return true;// !this.gameState.s || this.gameState.s.playerWon();
  }

  private controlsGenericScoreDisabled(action) : boolean {
    return true; //this.controlsDisabled 
      //|| !this.gameService.commandEnabled(action);
  }

  get controlsBackDisabled() : boolean {
    return true;//this.controlsGenericScoreDisabled(ActionsCricket.undo);
  }

  get controlsEnTurnDisabled() : boolean  {
    return true;//this.controlsGenericScoreDisabled(ActionsCricket.endTurn);
  }

  controlsScoreDisabled(score) : boolean {
    return true;////this.controlsGenericScoreDisabled(ActionsCricket.score)
     // || this.gameState.s.playerScoreState(score) == PlayerScore.closed;
  }

  controlsScoreState(score) {
    //if (!this.gameState.s) return "";   
    return "";//PlayerScore[this.gameState.s.playerScoreState(score)];
  }

  back() {
    //this.gameService.execute({action: ActionsCricket.undo});
  }

  endTurn() {
    //this.gameService.execute({action: ActionsCricket.endTurn});
  }

  hitSingle(value) {
    //this.gameService.execute({action: ActionsCricket.score, score:value, multiplier: DartScore.single});
  }

  hitDouble(value) {
    //this.gameService.execute({action: ActionsCricket.score, score:value, multiplier: DartScore.double});
  }

  hitTriple(value) {
   //this.gameService.execute({action: ActionsCricket.score, score:value, multiplier: DartScore.triple});
  }

  mis() {
    //this.gameService.execute({action: ActionsCricket.score, score: DartScore.miss});
  }
}
