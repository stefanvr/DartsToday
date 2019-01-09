import { Statistics, ActionsStatistics } from './Statistics'

import { PLAYER1 } from './CricketGame.examples';

describe('Statistics', () => {
    let sut: Statistics

    beforeEach(() => {
        sut = new Statistics();
    });

    describe('Inital state:', () => {   
        it('convertAction, converts enum ActionsPlayers to string', () => {  
            expect(sut.convertAction(ActionsStatistics.undo)).toEqual("undo");
        });

        it('createdAt,returns null', () => {  
            expect(sut.state.createdAt).toEqual(null);
        });

        it('enabledActions: none', () => {  
            expect(sut.enabledActions).toEqual([]);
        });

        it('eventHandler: not handled event', () => {  
            expect(sut.eventHandler({ action: "UnkownEvent"})).not.toThrowError;
        });

        it('players', () => {  
            expect(sut.state.players).toEqual([]);
        });
    });

    describe('Handle game events, with addPlayer event send:', () => {
        beforeEach(() => {
            sut.eventHandler({ action: "addPlayer", player: PLAYER1 });
        });

        it('players, return Player1 ', () => {  
            expect(sut.state.players.length).toBe(1);
            expect(sut.state.players[0].player).toBe(PLAYER1);
        });

        it('Score, after hit', () => {  
            let player = sut.state.players[0];

            expect(player.dartsThrown).toBe(0);
            expect(player.dartsHit).toBe(0);
        });
    
        it('Score, after hit', () => {  
            let player = sut.state.players[0];
            sut.eventHandler( {"action":"score","score":20,"multiplier":3,playerId:PLAYER1.id});
            expect(player.dartsThrown).toBe(1);
            expect(player.dartsHit).toBe(1);
        });

        it('Score, after mis', () => {  
            let player = sut.state.players[0];
            sut.eventHandler( {"action":"score","score":0,"multiplier":1,playerId:PLAYER1.id});
            expect(player.dartsThrown).toBe(1);
            expect(player.dartsHit).toBe(0);
        });
    });
});
