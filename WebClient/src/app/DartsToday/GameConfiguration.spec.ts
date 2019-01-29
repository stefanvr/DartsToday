import { GameConfiguration } from './GameConfiguration'

import { PLAYER1, PLAYER2 } from './CricketGame.examples';

describe('GameConfiguration', () => {
    let sut: GameConfiguration;

    beforeEach(() => {
        sut = new GameConfiguration();
    });

    describe('For a new configuration:', () => {
        it('selectedGameType, return  "Cricket"', () => {
            expect(sut.state.selectedGameType).toBe("Cricket");
        });

        it('selectedPlayers, returns Player 1 and 2', () => {
            expect(sut.state.selectedPlayers).toEqual([PLAYER1, PLAYER2]);
        });   
    });
});