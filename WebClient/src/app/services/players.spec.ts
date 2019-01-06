import { Players , ActionsPlayers} from './players'

import  * as DateTime from '../lib/datetime';
import { PLAYER1, PLAYER2 } from '../DartsToday/CricketGameExamples'

// POC test without aggregate wrapper
describe('Players', () => {
    let sut: Players
    
    beforeEach(() => {
        sut = new Players();
    });

    describe('Inital state:', () => {   
        it('convertAction, converts enum ActionsPlayers to string', () => {  
            expect(sut.convertAction(ActionsPlayers.newPlayer)).toEqual("newPlayer");
        });

        it('createdAt,returns null', () => {  
            expect(sut.state.createdAt).toEqual(null);
        });

        it('uniquePlayers, returns empty list', () => {  
            expect(sut.state.uniquePlayers).toEqual([]);
        });

        it('enabledActions: none', () => {  
            expect(sut.enabledActions).toEqual([]);
        });
    });

    describe('After initialized:', () => {
        let creationDate = DateTime.now();
        beforeEach(() => {
          sut.initialized({ createdAt: creationDate }); 
        });

        it('createdAt, returns creation date', () => {  
            expect(sut.state.createdAt).toEqual(creationDate);
        });
        it('uniquePlayers, returns empty list', () => {  
            expect(sut.state.uniquePlayers).toEqual([]);
        });

        it('enabledActions: newPlayer', () => {  
            expect(sut.enabledActions).toEqual([ActionsPlayers.newPlayer]);
        });
    });

    describe('After adding newPlayer:', () => {
        beforeEach(() => {
            sut.initialized({ createdAt: "dt" }); 
            sut.newPlayer({ action: ActionsPlayers.newPlayer, player: PLAYER1 });
        });

        it('uniquePlayers, returns new player', () => {  
            expect(sut.state.uniquePlayers.length).toEqual(1);
            expect(sut.state.uniquePlayers[0].id).toEqual(PLAYER1.id);
        });

        it('Player state, canBeRemoved:true', () => { 
            let player = sut.state.uniquePlayers[0]; 
            expect(player.canBeRemoved).toBe(true);
        });

        it('enabledActions: addpLayer, removePlayer', () => {  
            expect(sut.enabledActions).toEqual([ActionsPlayers.newPlayer, ActionsPlayers.deletePlayer]);
        });
    });

    describe('With player in list', () => {
        beforeEach(() => {
            sut.initialized({ createdAt: "dt" }); 
            sut.newPlayer({ action: ActionsPlayers.newPlayer, player: PLAYER1 });
        });

        it('When removing player, enabledActions: newPlayer', () => {  
            sut.deletePlayer({ action: Players, player: PLAYER1 });
            expect(sut.enabledActions).toEqual([ActionsPlayers.newPlayer]);
        });

        it('uniquePlayers, returns players', () => {  
            sut.deletePlayer({ action: Players, player: PLAYER1 });
            expect(sut.state.uniquePlayers).toEqual([]);
        });

        it('When adding second and then removing player, enabledActions: newPLayer, deletePlayer', () => {  
            sut.newPlayer({ action: ActionsPlayers.newPlayer, player: PLAYER2 });
            sut.deletePlayer({ action: Players, player: PLAYER1 });
            expect(sut.enabledActions).toEqual([ActionsPlayers.newPlayer, ActionsPlayers.deletePlayer]);
        });
    });

    describe('Event handling', () => {
        beforeEach(() => {
            sut.initialized({ createdAt: "dt" }); 
            sut.newPlayer({ action: ActionsPlayers.newPlayer, player: PLAYER1 });
            sut.newPlayer({ action: ActionsPlayers.newPlayer, player: PLAYER2 });
            sut.eventHandler_addPlayer({ action: 'addPlayer', player: PLAYER1 })
        });

        it('Player1 state, canBeRemoved:false', () => { 
            let player = sut.state.uniquePlayers[0]; 
            expect(player.canBeRemoved).toBe(false);
        });

        it('Player2 state, canBeRemoved:false', () => { 
            let player = sut.state.uniquePlayers[1]; 
            expect(player.canBeRemoved).toBe(true);
        });
    });
});