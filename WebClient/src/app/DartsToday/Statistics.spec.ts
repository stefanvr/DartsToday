import { Statistics, StatisticsState } from './Statistics'

import { SCORE_SINGLE_20, START_GAME_DATA, SCORE_NONE } from './CricketGame.examples';

describe('Statistics', () => {
    let sut: Statistics;
    let state = new StatisticsState();

    beforeEach(() => {
        state = new StatisticsState();
        sut = new Statistics(state);
    });

    describe('Inital state:', () => {   
        it('state', () => {  
            expect(sut.state).toBe(state);
        });
    });

    describe('startGame:', () => { 
        beforeEach(() => {
            sut.startGame(START_GAME_DATA);
        });
    });

    describe('dart score single 20:', () => { 
        let player;
        
        beforeEach(() => {
            sut.startGame(START_GAME_DATA);
            sut.score(SCORE_SINGLE_20);
            player = sut.state.players[0];
        });

        it('dartsThrown, returns ' + 1, () => {  
            expect(player.dartsThrown).toEqual(1);
        });

        it('dartsHit hit return 1', () => {  
            expect(player.dartsHit).toEqual(1);
        });

        it('avg return 1', () => {  
            expect(player.avg).toEqual(1);
        });
    });

    describe('dart score miss:', () => { 
        let player;

        beforeEach(() => {
            sut.startGame(START_GAME_DATA);
            sut.score(SCORE_NONE);
            player = sut.state.players[0];
        });

        it('game dartsThrown, returns ' + 1, () => {  
            expect(sut.state.dartsThrown).toEqual(1);
        });

        it('dartsThrown, returns ' + 1, () => {  
            expect(player.dartsThrown).toEqual(1);
        });

        it('dartsHit hit returns 0', () => {  
            expect(player.dartsHit).toEqual(0);
        });

        it('avg return 0', () => {  
            expect(player.avg).toEqual(0);
        });
    });

    describe('dart score:', () => { 
        let player;
        beforeEach(() => {
            sut.startGame(START_GAME_DATA);
            sut.score(SCORE_NONE);
            sut.endTurn();
            player = sut.state.players[0];
        });

        it('currentPLayer, returns ' + 1, () => {  
            expect(sut.state.currentPLayer).toEqual(1);
        });

        it('dartsThrown returns 0', () => {  
            expect(sut.state.dartsThrown).toEqual(0);
        });

        it('player.dartsThrown returns 3', () => {  
            expect(player.dartsThrown).toEqual(3);
        });
    });

    describe('Second round:', () => { 
        beforeEach(() => {
            sut.startGame(START_GAME_DATA);
            sut.state.players.forEach( () => sut.endTurn());
        });

        it('currentPLayer, returns ' + 1, () => {  
            expect(sut.state.currentPLayer).toEqual(0);
        });
    });

});