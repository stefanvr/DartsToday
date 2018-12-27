import { Actions,Cricket } from "./GameCricket";
import { Aggregate } from '../lib/Aggregate';

describe('CricketGame', () => {
    let game: Aggregate;
    let createDate = new Date(Date.now()).toISOString();
    let startedDate = new Date(Date.now()).toISOString();
    let player1 = { name: 'player 1'};
    let player2 = { name: 'player 2'};
  
    beforeEach(() => {
        game = Aggregate.CreateNew(createDate, Cricket);
    });
  
    describe('For a new game:', () => {
        it('There is no turn state', () => {
            expect(game.state().turnState).toBe(null);
        });

        it('The game state, createAt is set', () => {
            expect(game.state().createAt).toBe(createDate);
        });

        it('The game state, startedAt is not set', () => {
            expect(game.state().startedAt).toBe(undefined);
        });

        it('Actions possible are: AddPlayers', () => {
            expect(game.enabledActions.length).toBe(1);
            expect(game.enabledActions).toContain(Actions.AddPlayers);
        });

        it('The eventSource contains Initialized event', () => {
            expect(game.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}]});
        });
    });

    describe('For prepared game:', () => {
        beforeEach(() => {
            game.execute({action: Actions.AddPlayers, players:[player1, player2]});
        });

        it('Actions possible are: StartGame', () => {
            
            expect(game.enabledActions.length).toBe(1);
            expect(game.enabledActions).toContain(Actions.StartGame);
        });
    });

    describe('For a started game:', () => {
        beforeEach(() => {
            console.log("set:" +  startedDate);
            game.execute({action: Actions.AddPlayers, players:[player1, player2]});
            game.execute({action: Actions.StartGame, startedAt: startedDate});
        });

        it('Actions possible: endturn, score', () => {
            expect(game.enabledActions.length).toBe(2);
            expect(game.enabledActions).toContain(Actions.EndTurn);
            expect(game.enabledActions).toContain(Actions.Score);
        });

        it('The game state, startedAt is set', () => {
            expect(game.state().startedAt).toBe(startedDate);
        });

        it('start command to be skipped', () => {
            let first = game.state().startedAt;
            game.execute({action: Actions.StartGame});
            expect(game.state().startedAt).toBe(first);
        });

        it('The current turn is 1', () => {
            expect(game.state().turnState.turn).toBe(1);
        });

        it('After the endTurn, the current turn is 2', () => {
            game.execute({action: Actions.EndTurn});
            expect(game.state().turnState.turn).toBe(2);

            console.log("ES = " + JSON.stringify(game.eventSource()));
        });
    });
});

describe('CricketGamePersistance', () => {
    let game: Aggregate;
    let es = { events: [{ action: "initialized", createdAt: "mytime"}]};
    beforeEach(() => {
        game =  Aggregate.CreateFromEs(es, Cricket);
    });
  
    it('Load from es set', () => {
        expect(game.eventSource()).toEqual(es);
    });
});