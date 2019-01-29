import { combineReducers } from 'redux'
import { CreateTypedReducer, GenericDomainReducer, GenericDummyReducer } from './lib/reduxhelpers';

import { GameConfiguratieState } from './DartsToday/GameConfiguration'
import { ActionsCricket, Leg } from './DartsToday/CricketGame'
import { Cricket } from './DartsToday/CricketGameRules'
import { StatisticsState, Statistics } from './DartsToday/Statistics';

export interface IAppState {
    gameConfig : GameConfiguratieState;
    
    leg : Leg;
    legStatistics : StatisticsState;
}

// Not used, but needs to be passed in
export const INITIAL_STATE = {} as IAppState;

export const rootReducer = combineReducers({
    gameConfig: CreateTypedReducer(GenericDummyReducer, null, GameConfiguratieState),
    
    leg : CreateTypedReducer(GenericDomainReducer, Cricket, Leg),
    legStatistics: CreateTypedReducer(GenericDomainReducer, Statistics, StatisticsState)
  })

export function createCommmand(command: ActionsCricket, data = null)
{
    return { type: ActionsCricket[command], data: data }
}