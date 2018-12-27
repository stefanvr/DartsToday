import * as gs from './GameState';
import { ActionObject } from '../lib/Aggregate';

export enum Actions { AddPlayers, StartGame, EndTurn, Score }

export class Cricket implements ActionObject {
    public enabledActions: any[] = [];
    public gameState: gs.GameState = new gs.GameState();
    
    convertAction(command) {
        return Actions[command];
    }

    initialized(event) { 
        this.gameState.createAt = event.createdAt;
        
        this.enabledActions = [Actions.AddPlayers];
    }

    AddPlayers(event) {  
         this.gameState.scoreState = new gs.ScoreState(event.players)
         
         if (this.canStart())
         {          
           this.enabledActions = [Actions.StartGame];
         }
    }
    
    StartGame(event) {  
        this.gameState.startedAt = event.startedAt;
        this.gameState.turnState = new gs.TurnState(1,[]);

        this.enabledActions = [Actions.Score, Actions.EndTurn];
    }

    EndTurn(event) {
        this.gameState.turnState.turn += 1;
    }
    
    private canStart(): boolean { 
        return this.gameState.scoreState &&
               this.gameState.scoreState.players &&
               this.gameState.scoreState.players.length > 0
    }
}