import { CricketState, PlayerState,GameScore, BULL, CricketScore } from "./Cricket";

describe('CricketState', () => {
    let cricketState: CricketState;

    let player1 = new PlayerState({ name: "player1"});
    let player2 = new PlayerState({ name: "player2"});
    let player3 = new PlayerState({ name: "player3"});

    beforeEach(() => {
        cricketState = new CricketState();
    });
  
    it('With 2 player, round is turn divided by 2', () => {
        cricketState.players.push(player1);
        cricketState.players.push(player2);

        cricketState.turn = 1
        expect(cricketState.round).toBe(1);
        cricketState.turn = 2
        expect(cricketState.round).toBe(1);
        cricketState.turn = 3
        expect(cricketState.round).toBe(2);
        cricketState.turn = 4
        expect(cricketState.round).toBe(2);
    });

    describe('With 3 players:', () => {
        beforeEach(() => {
            cricketState.players.push(player1);
            cricketState.players.push(player2);
            cricketState.players.push(player3);
        });

        it('round is turn divided by 3', () => {
            cricketState.turn = 1
            expect(cricketState.round).toBe(1);
            cricketState.turn = 2
            expect(cricketState.round).toBe(1);
            cricketState.turn = 3
            expect(cricketState.round).toBe(1);
            cricketState.turn = 4
            expect(cricketState.round).toBe(2);
            cricketState.turn = 5
            expect(cricketState.round).toBe(2);
            cricketState.turn = 6
            expect(cricketState.round).toBe(2);
        });

        it('Active player matches turn', () => {
            cricketState.turn = 1
            expect(cricketState.activePlayer.name).toBe(player1.name);
            cricketState.turn = 2
            expect(cricketState.activePlayer.name).toBe(player2.name);
            cricketState.turn = 3
            expect(cricketState.activePlayer.name).toBe(player3.name);
            cricketState.turn = 4
            expect(cricketState.activePlayer.name).toBe(player1.name);
            cricketState.turn = 5
            expect(cricketState.activePlayer.name).toBe(player2.name);
            cricketState.turn = 6
            expect(cricketState.activePlayer.name).toBe(player3.name);
        });
    });

    describe('With 3 players:', () => {

        beforeEach(() => {
            cricketState.players.push(player1);
            cricketState.players.push(player2);
        });

      [BULL,20,19,18,17,16,15].forEach(score => {
        it('Score ' + score + 'open', () => {
            expect(cricketState.gameScore(score)).toBe(GameScore.open);
        });

        it('With single player closed ' + score + 'open for scoring', () => {
            cricketState.players[0].score[score] = CricketScore.closed;
            expect(cricketState.gameScore(score)).toBe(GameScore.playerToScore);
        });

        it('With all player closed ' + score + ' closed for scoring', () => {
            cricketState.players[0].score[score] = CricketScore.closed;
            cricketState.players[1].score[score] = CricketScore.closed;
            expect(cricketState.gameScore(score)).toBe(GameScore.closed);
        });
      });
    });
});