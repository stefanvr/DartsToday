import { GameConfiguration, ActionsGameConfig } from './GameConfiguration'

import  * as DateTime from '../lib/datetime';

describe('GameConfiguration', () => {
    let sut: GameConfiguration;
    let creationDate = DateTime.now();

    beforeEach(() => {
        sut = new GameConfiguration();
    });

    describe('For a new configuration:', () => {
        it('convertAction, converts enum ActionsPlayers to string', () => {  
            expect(sut.convertAction(ActionsGameConfig.start)).toEqual("start");
        });
        
        it('createdAt, returns null', () => {
            expect(sut.state.createdAt).toEqual(null);
        });

        it('selectedGameType, return  "Cricket"', () => {
            expect(sut.state.selectedGameType).toBe("Cricket");
        });

        it('selectedPlayers, returns Player 1 and 2', () => {
            expect(sut.state.selectedPlayers).toEqual([{ name: 'player 1'}, { name: 'player 2'}]);
        });   
    });

    describe('After initialized, reflects current fixed cricket configuration:', () => {
        beforeEach(() => {
            sut.initialized({ createdAt: creationDate });
        });

        it('createdAt, returns creation date', () => {
            expect(sut.state.createdAt).toBe(creationDate);
        });

        it('Possible action(s): addPlayer', () => {
            expect(sut.enabledActions).toContain(ActionsGameConfig.start); 
            expect(sut.enabledActions.length).toBe(1); 
        });
    });
});