import { ActionsCricket, Cricket } from "./Cricket";

import { Aggregate } from '../lib/Aggregate';

describe('Cricket', () => {
    let game: Aggregate;
    let createDate = new Date(Date.now()).toISOString();
    
  
    beforeEach(() => {
        game = Aggregate.CreateNew(createDate, Cricket);
    });
  
    describe('For a new game:', () => {
        it('The game state, createAt is set', () => {
            expect(game.state().createAt).toBe(createDate);
        });

        it('Possible action(s): addPlayer', () => {
            expect(game.enabledActions).toContain(ActionsCricket.addPlayer); 
            expect(game.enabledActions.length).toBe(1); 
        });

        describe('When adding a player:', () => {
            let player1 = { name: 'player 1'};

            beforeEach(() => {
                game.execute({action: ActionsCricket.addPlayer, player: player1});
            });

            it(' addPossible action(s): addPlayer', () => {
                expect(game.state().players[0].name).toBe(player1.name);
            });

            it('Possible action(s): addPlayer', () => {
                expect(game.enabledActions).toContain(ActionsCricket.addPlayer); 
                expect(game.enabledActions).toContain(ActionsCricket.startGame); 
                expect(game.enabledActions.length).toBe(2); 
            });

            it('After multiple players added, Possible action(s): addPlayer, startGame', () => {
                game.execute({action: ActionsCricket.addPlayer, player: player1});
                expect(game.enabledActions).toContain(ActionsCricket.addPlayer); 
                expect(game.enabledActions).toContain(ActionsCricket.startGame); 
                expect(game.enabledActions.length).toBe(2); 
            });
        });
    });
});