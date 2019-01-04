import { GameConfiguration, ActionsGameConfig } from './GameConfiguration'

import { Aggregate } from '../lib/aggregate';

describe('GameConfiguration', () => {
    let sut: Aggregate;
    let createDate = new Date(Date.now()).toISOString();
    
    describe('For a new configuration:', () => {
        beforeEach(() => {
            sut = Aggregate.CreateNew(createDate, GameConfiguration);
        });

        it('The game state, createAt is set', () => {
            expect(sut.state().createdAt).toBe(createDate);
        });

        it('Possible action(s): addPlayer', () => {
            expect(sut.enabledActions()).toContain(ActionsGameConfig.start); 
            expect(sut.enabledActions().length).toBe(1); 
        });
    });

    describe('Current fixed cricket configuration:', () => {
        it('The selectedGameType is "Cricket"', () => {
            expect(sut.state().selectedGameType).toBe("Cricket");
        });

        it('The selectedPlayers are Player 1 and 2', () => {
            expect(sut.state().selectedPlayers).toEqual([{ name: 'player 1'}, { name: 'player 2'}]);
        });
    });
});