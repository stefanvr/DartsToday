import { Leg, MAX_DART_IN_TURN, SCORES_OPTIONS, GameScore, CricketScore, DartScore } from "./CricketGame";
import { Cricket } from '../DartsToday/CricketGameRules'

import {
    PLAYERS, PLAYER1, PLAYER2, NUMBER_OF_PLAYERS,
    SCORE_OPTION_20, SCORE_SINGLE_20, SCORE_DOUBLE_20, SCORE_TRIPLE_20, SCORE_NONE, START_GAME_DATA 
} from './CricketGame.examples';

describe('Cricket leg, created with ' + NUMBER_OF_PLAYERS + ' of players - ', () => {
    let sut: Cricket;

    function assertLegState(state) {
        it('Turn (number) to be ' + state.turn, () => {
           expect(sut.leg.turn).toEqual(state.turn);
        });
    
        it('Round (number) to be ' + state.round, () => {
            expect(sut.leg.round).toEqual(state.round);
        });
    
        it('Current player to be player ' + state.currentPlayerName, () => {
            expect(sut.leg.currentPlayer.name).toEqual(state.currentPlayerName);
        });
    
        it('ActionScoreEnabled returns ' + state.actionScoreEnabled, () => {
            expect(sut.leg.actionScoreEnabled).toEqual(state.actionScoreEnabled);
        });
    
        it('ActionEndTurnEnabled returns ' + state.actionEndTurnEnabled, () => {
            expect(sut.leg.actionEndTurnEnabled).toEqual(state.actionEndTurnEnabled);
        });

        it('ActionStartGameEnabled returns ' + state.actionStartGameEnabled, () => {
            expect(sut.leg.actionStartGameEnabled).toEqual(state.actionStartGameEnabled);
        });
    }

    beforeEach(() => {
        sut = new Cricket(new Leg());        
        sut.startGame(START_GAME_DATA);
    });

    it('A leg is created', () => {
        expect(sut).toBeDefined(sut);
    });

    describe ('Starting a leg, first turn: ', () => {
        it('Players returns ' + NUMBER_OF_PLAYERS + ' players', () => {
            expect(sut.leg.players.length).toEqual(NUMBER_OF_PLAYERS);
        });

        assertLegState({
            turn:1,
            round:1,
            currentPlayerName: PLAYER1.name,
            actionScoreEnabled:true,
            actionEndTurnEnabled:true,
            actionStartGameEnabled:false
        });
    });

    describe ('Throw maximum darts (' + MAX_DART_IN_TURN + ') in a turn: ', () => {
        beforeEach(() => {
            for(let i=0; i<MAX_DART_IN_TURN; i++) {
                sut.score(SCORE_SINGLE_20);
            };
        });

        it('Additional score have no effect', () => {              
            sut.score(SCORE_SINGLE_20);
            expect(sut.leg.turnScore.dartsThrown.length).toEqual(MAX_DART_IN_TURN);
        });

        it('End turn, to re-enblescore', () => {              
            sut.endTurn()
            expect(sut.leg.actionScoreEnabled).toEqual(true);
        });

        assertLegState({
            turn:1,
            round:1,
            currentPlayerName: PLAYER1.name,
            actionScoreEnabled: false,
            actionEndTurnEnabled:true,
            actionStartGameEnabled:false
        });

    });

    describe ('After first player ending turn: ', () => {
        beforeEach(() => {
            sut.endTurn();
        });

        assertLegState({
            turn:2,
            round:1,
            currentPlayerName: PLAYER2.name,
            actionScoreEnabled: true,
            actionEndTurnEnabled:true,
            actionStartGameEnabled:false
        });
    });

    describe ('After all players ending a turn: ', () => {
        beforeEach(() => {
            PLAYERS.forEach( player => {
              sut.endTurn();
            });
        });

        assertLegState({
            turn:3,
            round:2,
            currentPlayerName: PLAYER1.name,
            actionScoreEnabled: true,
            actionEndTurnEnabled:true,
            actionStartGameEnabled:false
        });
    });

    describe ('Player score: ', () => {
        describe ('Score option: ', () => {

            SCORES_OPTIONS.forEach(score => {
                it('Current player score option ' + score + ' at the start of a game returns no hits', () => {                
                    expect(sut.leg.currentPlayer.score[score]).toEqual(CricketScore.noHit);
                });
            });
    
            it('Current player score option ' + SCORE_OPTION_20 + ' after ' + DartScore[DartScore.single] + ' ' + SCORE_OPTION_20 + ' returns ' + CricketScore[CricketScore.oneHit], () => {                
                sut.score(SCORE_SINGLE_20);
                expect(sut.leg.currentPlayer.score[SCORE_OPTION_20]).toEqual(CricketScore.oneHit);
            });
    
            it('Current player score option ' + SCORE_OPTION_20 + ' after ' + DartScore[DartScore.double] + ' ' + SCORE_OPTION_20 + ' returns ' + CricketScore[CricketScore.twoHits], () => {                
                sut.score(SCORE_DOUBLE_20);
                expect(sut.leg.currentPlayer.score[SCORE_OPTION_20]).toEqual(CricketScore.twoHits);
            });
    
            it('Current player score option ' + SCORE_OPTION_20 + ' after ' + DartScore[DartScore.triple] + ' ' + SCORE_OPTION_20 + ' returns ' + CricketScore[CricketScore.closed], () => {                
                sut.score(SCORE_TRIPLE_20);
                expect(sut.leg.currentPlayer.score[SCORE_OPTION_20]).toEqual(CricketScore.closed);
            });
            
            it('Current player score option ' + SCORE_OPTION_20 + ' 2x ' + DartScore[DartScore.triple] + ' ' + SCORE_OPTION_20 + ' returns ' + CricketScore[CricketScore.closed], () => {                
                sut.score(SCORE_TRIPLE_20);
                sut.score(SCORE_TRIPLE_20);
                expect(sut.leg.currentPlayer.score[SCORE_OPTION_20]).toEqual(CricketScore.closed);
            });
        });

       describe ('All players close the score option ' + SCORE_OPTION_20, () => {
            beforeEach(() => {
                PLAYERS.forEach( player => {
                    sut.score(SCORE_TRIPLE_20);
                    sut.endTurn();
                  });
            });
           
            for(let i =0; i < PLAYERS.length; i++) {
                it('for ' + PLAYERS[i].name + ' returns has CricketScore.closed', () => {                
                    expect(sut.leg.players[i].score[SCORE_OPTION_20]).toEqual(CricketScore.closed);
                });
            };
        });

        describe ('Single player closes all scores ', () => {
            beforeEach(() => {
                SCORES_OPTIONS.forEach(score => {
                    sut.score({ score:score, multiplier: DartScore.triple });
                    PLAYERS.forEach( player => {
                      sut.endTurn();
                    });
                });
            });
    
            SCORES_OPTIONS.forEach(score => {
                it('for score option ' + score + ' returns CricketScore.closed', () => {                
                    expect(sut.leg.currentPlayer.score[score]).toEqual(CricketScore.closed);
                });
            });
        });
    });

    describe ('Game score (' + SCORE_OPTION_20 + '): ', () => {
    
        it('Game score option ' + SCORE_OPTION_20 + ' at start returns Open', () => {        
            expect(sut.leg.game.score[SCORE_OPTION_20]).toEqual(GameScore.open);
        });

        it('Game score option when single player closes   ' + SCORE_OPTION_20 + ' returns playerToScore', () => {  
            sut.score(SCORE_TRIPLE_20);      
            expect(sut.leg.game.score[SCORE_OPTION_20]).toEqual(GameScore.playerToScore);
        });

        it('Game score option when all players closed ' + SCORE_OPTION_20 + ' returns Closed', () => { 
            PLAYERS.forEach( player => {
                sut.score(SCORE_TRIPLE_20);
                sut.endTurn();
            });

            expect(sut.leg.game.score[SCORE_OPTION_20]).toEqual(GameScore.closed);
        });
    });

    describe ('Player bonus: ', () => {
    
        it('Game score option noscore returns 0 bonus', () => { 
            sut.score(SCORE_NONE); 
            expect(sut.leg.turnScore.bonus).toEqual(0);      
            expect(sut.leg.currentPlayer.bonus).toEqual(0);
        });

        it('Game score option triple ' + SCORE_OPTION_20 + ' return 0 bonus', () => { 
            sut.score(SCORE_TRIPLE_20); 
            expect(sut.leg.turnScore.bonus).toEqual(0);      
            expect(sut.leg.currentPlayer.bonus).toEqual(0);
        });

        it('Game score option single & triple ' + SCORE_OPTION_20 + ' returns player bonus 20 and turn bonus 20', () => { 
            sut.score(SCORE_SINGLE_20);       
            sut.score(SCORE_TRIPLE_20);       
            expect(sut.leg.currentPlayer.bonus).toEqual(20);
            expect(sut.leg.turnScore.bonus).toEqual(20);  
        });

        it('Game score option triple & triple ' + SCORE_OPTION_20 + ' returns player bonus 60 and turn bonus 60', () => { 
            sut.score(SCORE_TRIPLE_20);       
            sut.score(SCORE_TRIPLE_20);       
            expect(sut.leg.currentPlayer.bonus).toEqual(60);
            expect(sut.leg.turnScore.bonus).toEqual(60);
        });

        it('Game score option after first turn triple & double and second turn triple ' + SCORE_OPTION_20 + ' returns player bonus 100 and turn bonus 60', () => { 
            sut.score(SCORE_TRIPLE_20);       
            sut.score({ score:SCORE_OPTION_20, multiplier: DartScore.double }); 
            sut.endTurn();sut.endTurn();      
            sut.endTurn();sut.endTurn();      
            sut.score(SCORE_TRIPLE_20);       
            expect(sut.leg.currentPlayer.bonus).toEqual(100);
            expect(sut.leg.turnScore.bonus).toEqual(60);
        });

        it('Game score option closed, hitting triple & triple' + SCORE_OPTION_20 + ' return 0 bonus', () => { 
            // closing score option
            sut.score(SCORE_TRIPLE_20);
            sut.score(SCORE_TRIPLE_20);  
            sut.endTurn();
            // determine bones
            sut.score(SCORE_TRIPLE_20);
            sut.score(SCORE_TRIPLE_20); 

            expect(sut.leg.currentPlayer.bonus).toEqual(0);
            expect(sut.leg.turnScore.bonus).toEqual(0);
        });
    });

    describe ('The winner: ', () => {
        beforeEach(() => {
            SCORES_OPTIONS.forEach(score => {
                if (score != SCORE_OPTION_20)
                { 
                    sut.score({ score:score, multiplier: DartScore.triple });
                    PLAYERS.forEach( player => {
                    sut.endTurn();
                    });
                }
            });
        });

        it('Before last close, winnar returns none', () => { 
            expect(sut.leg.winner).toEqual(null);
        });

        it('after last close, winner returns player 1', () => { 
            sut.score(SCORE_TRIPLE_20);
            sut.endTurn();
                
            expect(sut.leg.winner).toEqual(PLAYER1);
        });

        it('after last close, all game options disabled', () => { 
            sut.score(SCORE_TRIPLE_20);
            sut.endTurn();
                
            expect(sut.leg.actionEndTurnEnabled).toEqual(false);
            expect(sut.leg.actionScoreEnabled).toEqual(false);
            expect(sut.leg.actionStartGameEnabled).toEqual(false);
        });

        it('after last close, but lower bonus, winner is none', () => { 
            sut.endTurn();
            /// player 2 - bonus
            sut.score(SCORE_TRIPLE_20);
            sut.score(SCORE_TRIPLE_20);
            sut.endTurn();
            
            sut.score(SCORE_TRIPLE_20);
            sut.endTurn();
                
            expect(sut.leg.winner).toEqual(null);
        });

        it('after last close equal bonus, winner is player 1', () => { 
            sut.endTurn();
            // player 2 - bonus
            sut.score(SCORE_TRIPLE_20);
            sut.score(SCORE_TRIPLE_20);
            sut.endTurn();
           
            // player 1 - closes
            sut.score(SCORE_TRIPLE_20);
            // player 1 - bonus
            sut.score({ score:15, multiplier: DartScore.triple });
            sut.score({ score:15, multiplier: DartScore.triple });
            sut.endTurn();
            
            expect(sut.leg.winner).toEqual(PLAYER1);
        });
    });
});
