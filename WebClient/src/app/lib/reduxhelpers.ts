import { produce } from "immer"
import { createInstance } from './typehelpers';

export function CreateTypedReducer(reducer, procesType, dataType) {
    return (state, action) => {
        return produce(state, draftState => {
          return reducer(draftState, action, procesType, dataType)
        })}
    }

export function GenericDomainReducer(state, action, procesType, dataType) {
    if (!state) { return createInstance(dataType)} 

    let c = createInstance(procesType, state);
    if(c[action.type]) {
        c[action.type](action.data); 
    }
    else
    {
        console.log("Unkown event:"+ JSON.stringify(action) + ":"+ JSON.stringify(state) );
    }

    return state;
}

// Used as place holder, without functionality yet
export function GenericDummyReducer(state, action, procesType, dataType) {
    if (!state) { return createInstance(dataType)} 
    return state;
}