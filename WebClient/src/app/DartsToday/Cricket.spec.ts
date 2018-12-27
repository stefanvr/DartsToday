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
    });
});