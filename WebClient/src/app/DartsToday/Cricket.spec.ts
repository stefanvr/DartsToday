import { ActionsCricket, Cricket, MAX_PLAYERS } from "./Cricket";

import { Aggregate } from '../lib/Aggregate';

describe('Cricket', () => {
    let game: Aggregate;
    let createDate = new Date(Date.now()).toISOString();
    
    beforeEach(() => {
        game = Aggregate.CreateNew(createDate, Cricket);
    });
  
    describe('For a new game:', () => {
        it('The game state, createAt is set', () => {
            expect(game.state().createdAt).toBe(createDate);
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

            it('First player is player 1', () => {
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

            it('After max (' + MAX_PLAYERS + ') players added, Possible action(s): addPlayer', () => {
                game.execute({action: ActionsCricket.addPlayer, player: player1});
                game.execute({action: ActionsCricket.addPlayer, player: player1});
                expect(game.enabledActions).toContain(ActionsCricket.startGame); 
                expect(game.enabledActions.length).toBe(1); 
            });
        });

        describe('When game started:', () => {
            let startDate = new Date(Date.now()).toISOString();
            let player1 = { name: 'player 1'};

            beforeEach(() => {
                game.execute({action: ActionsCricket.addPlayer, player: player1});
                game.execute({action: ActionsCricket.startGame, startedAt: startDate });
            });

            it('The game state, createAt is set', () => {
                expect(game.state().startedAt).toBe(startDate);
            });

            it('The game state, turn is 1', () => {
                expect(game.state().turn).toBe(1);
            });

            it('Possible action(s): score', () => {
                expect(game.enabledActions).toContain(ActionsCricket.score); 
                expect(game.enabledActions.length).toBe(1); 
            });

            it('Turn state, DartsRemaining 3', () => {
                expect(game.state().activeturn.dartsremaining).toBe(3); 
            });

            it('Turn state, after score, DartsRemaining 2', () => {
                game.execute({action: ActionsCricket.score, score: 0 });
                expect(game.state().activeturn.dartsremaining).toBe(2); 
            });
        });

    });
});