import { ActionsCricket, Cricket, DartScore, CricketScore, MAX_PLAYERS, BULL } from "./Cricket";

import { Aggregate } from '../lib/Aggregate';
import { STARTED_GAME, PLAYER1_WIN_GAME } from './CricketGameExamples';

describe('Cricket', () => {
    let game: Aggregate;
    let createDate = new Date(Date.now()).toISOString();
    
    describe('For a new game:', () => {
        beforeEach(() => {
            game = Aggregate.CreateNew(createDate, Cricket);
        });

        it('The game state, createAt is set', () => {
            expect(game.state().createdAt).toBe(createDate);
        });

        it('Possible action(s): addPlayer', () => {
            expect(game.enabledActions()).toContain(ActionsCricket.addPlayer); 
            expect(game.enabledActions().length).toBe(1); 
        });
    });

    describe('New game adding a player:', () => {
        let player1 = { name: 'player 1'};

        beforeEach(() => {
            game = Aggregate.CreateNew(createDate, Cricket);
            game.execute({action: ActionsCricket.addPlayer, player: player1});
        });

        it('First player is player 1', () => {
            expect(game.state().players[0].name).toBe(player1.name);
        });

        it('Possible action(s): addPlayer', () => {
            expect(game.enabledActions()).toContain(ActionsCricket.addPlayer); 
            expect(game.enabledActions()).toContain(ActionsCricket.startGame); 
            expect(game.enabledActions().length).toBe(2); 
        });

        it('After multiple players added, Possible action(s): addPlayer, startGame', () => {
            game.execute({action: ActionsCricket.addPlayer, player: player1});
            expect(game.enabledActions()).toContain(ActionsCricket.addPlayer); 
            expect(game.enabledActions()).toContain(ActionsCricket.startGame); 
            expect(game.enabledActions().length).toBe(2); 
        });

        it('After max (' + MAX_PLAYERS + ') players added, Possible action(s): addPlayer', () => {
            game.execute({action: ActionsCricket.addPlayer, player: player1});
            game.execute({action: ActionsCricket.addPlayer, player: player1});
            expect(game.enabledActions()).toContain(ActionsCricket.startGame); 
            expect(game.enabledActions().length).toBe(1); 
        });
    
        it('The game state, createAt is set', () => {
            let startDate = new Date(Date.now()).toISOString();
            game.execute({action: ActionsCricket.addPlayer, player: player1});
            game.execute({action: ActionsCricket.addPlayer, player: player1});
            game.execute({action: ActionsCricket.startGame, startedAt: startDate });
           
            expect(game.state().startedAt).toBe(startDate);
        });
    });

    describe('When game started:', () => {
        let score = 20;

        beforeEach(() => {
            game = Aggregate.CreateFromEs(STARTED_GAME, Cricket);
        });

        it('The game state, turn is 1', () => {
            expect(game.state().turn).toBe(1);
        });

        it('Possible action(s): score and endTurn', () => {
            expect(game.enabledActions()).toContain(ActionsCricket.score); 
            expect(game.enabledActions()).toContain(ActionsCricket.endTurn); 
            expect(game.enabledActions().length).toBe(2); 
        });

        it('Turn state, DartsRemaining 3', () => {
            expect(game.state().activeturn.dartsremaining).toBe(3);
            expect(game.state().activeturn.dartsThrown).toBe(0); 
        });

        it('Turn state, after score, DartsRemaining 2', () => {
            game.execute({action: ActionsCricket.score, score: 0 });
            expect(game.state().activeturn.dartsremaining).toBe(2); 
            expect(game.state().activeturn.dartsThrown).toBe(1); 
        });

        it('Turn state, after score, DartsRemaining 2', () => {
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.endTurn });
            expect(game.state().activeturn.dartsremaining).toBe(3);
            expect(game.state().activeturn.dartsThrown).toBe(0); 
        });

        it('After score, Possible action(s): back, score, end turn', () => {
            game.execute({action: ActionsCricket.score, score: 0 });

            expect(game.enabledActions()).toContain(ActionsCricket.undo); 
            expect(game.enabledActions()).toContain(ActionsCricket.score); 
            expect(game.enabledActions()).toContain(ActionsCricket.endTurn); 
            expect(game.enabledActions().length).toBe(3);
        });

        it('After 3 scores, Possible action(s): back, endturn', () => {
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.score, score: 0 });

            expect(game.enabledActions()).toContain(ActionsCricket.undo);
            expect(game.enabledActions()).toContain(ActionsCricket.endTurn); 
            expect(game.enabledActions().length).toBe(2);
        });

        it('After 3 scores and endturn, possible action(s): back, score, endTurn', () => {
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.score, score: 0 });
            game.execute({action: ActionsCricket.endTurn });

            expect(game.enabledActions()).toContain(ActionsCricket.undo);
            expect(game.enabledActions()).toContain(ActionsCricket.endTurn); 
            expect(game.enabledActions()).toContain(ActionsCricket.score); 
            expect(game.enabledActions().length).toBe(3);
        });

        [BULL,20,19,18,17,16,15].forEach(score => {
            it('Player 1, at start, no score for: ' + score, () => {
                expect(game.state().players[0].score[score]).toEqual(CricketScore.noHit);
            });

            it('Player 1, after single, sinle score for: ' + score, () => {
                game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.single  });
                expect(game.state().players[0].score[score]).toEqual(CricketScore.one);
            });

            it('Player 1, after double, double score for: ' + score, () => {
                game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
                expect(game.state().players[0].score[score]).toEqual(CricketScore.two);
            });

            it('Player 1, after triple, closed score for: ' + score, () => {
                game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
                expect(game.state().players[0].score[score]).toEqual(CricketScore.closed);
            });
        });

        it('Player 1, at start, no score for: ' + score, () => {
            game.execute({action: ActionsCricket.score, score: 0, multiplier: 1});
            expect(game.state().players[0].bonus).toEqual(0);
        });
        
        it('Player 1, with score closed, stays close', () => {
            
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
            expect(game.state().players[0].score[score]).toEqual(CricketScore.closed);
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
            expect(game.state().players[0].score[score]).toEqual(CricketScore.closed);
        });

        it('Player 1, with score double and score double, is closed', () => {
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            expect(game.state().players[0].score[score]).toEqual(CricketScore.two);
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            expect(game.state().players[0].score[score]).toEqual(CricketScore.closed);
        });

        it('Player 1, with no score, bonus score is zero', () => {
            expect(game.state().players[0].bonus).toEqual(0);
        });

        it('Player 1, with score double and score double, bonus score equals single score', () => {
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            expect(game.state().players[0].bonus).toEqual(score);
        });

        it('After Player 1 doesnot close score, Player 2 gets bonus', () => {
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            game.execute({action: ActionsCricket.endTurn});
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            expect(game.state().players[1].bonus).toEqual(score);
        });

        it('After Player 1 closes score, Player 2 get no bonus', () => {
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
            game.execute({action: ActionsCricket.endTurn});
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.double });
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
            expect(game.state().players[1].bonus).toEqual(0);
        });

        it('After Player 1 closes score, in next turn Player 1 gets additional bonus', () => {
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.triple });
            game.execute({action: ActionsCricket.endTurn});
            game.execute({action: ActionsCricket.endTurn});
            game.execute({action: ActionsCricket.score, score: score, multiplier: DartScore.single });
            expect(game.state().players[0].bonus).toEqual(score);
        });

        function playTripleturn(scores)
        {
            game.execute({action: ActionsCricket.score, score: scores[0], multiplier: DartScore.triple });
            game.execute({action: ActionsCricket.score, score: scores[1], multiplier: DartScore.triple });
            game.execute({action: ActionsCricket.score, score: scores[2], multiplier: DartScore.triple });
            game.execute({action: ActionsCricket.endTurn});
            game.execute({action: ActionsCricket.endTurn});
        }
    });

    describe('Game Player 1 wins:', () => {
        beforeEach(() => {
            game = Aggregate.CreateFromEs(PLAYER1_WIN_GAME, Cricket);
        });
        
        it('Possible action(s):  ', () => {
            expect(game.enabledActions().length).toBe(0);
        });
    });
});