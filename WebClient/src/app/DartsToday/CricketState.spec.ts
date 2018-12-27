import { CricketState, PlayerState } from "./Cricket";

describe('CricketState', () => {
    let cricketState: CricketState;
    
    beforeEach(() => {
        cricketState = new CricketState();
    });
  
    it('With 2 player, round is turn divided by 2', () => {
        cricketState.players.push(new PlayerState({}));
        cricketState.players.push(new PlayerState({}));

        cricketState.turn = 1
        expect(cricketState.round).toBe(1);
        cricketState.turn = 2
        expect(cricketState.round).toBe(1);
        cricketState.turn = 3
        expect(cricketState.round).toBe(2);
        cricketState.turn = 4
        expect(cricketState.round).toBe(2);
    });

    it('With 3 player, round is turn divided by 3', () => {
        cricketState.players.push(new PlayerState({}));
        cricketState.players.push(new PlayerState({}));
        cricketState.players.push(new PlayerState({}));

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
});