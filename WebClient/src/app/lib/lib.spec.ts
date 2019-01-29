import * as Datetime from './datetime'

describe('Datime', () => {
    let stringSortableTimeFormat = "xxxx-xx-xxTxx:xx:xx.xxxZ" // example '2019-01-28T22:25:16.283Z'
    it('Datime, returns string sortable datetime ('+ stringSortableTimeFormat + ')', () => {  
        expect(Datetime.now().replace(/[0-9]/g, "x")).toEqual(stringSortableTimeFormat);
    });
});

import { createInstance } from "./typehelpers";

class TestDouble {
    public data;
 }

class TestDoubleWithContructorArgs {
    constructor(
        public state: any
    ) { }

    commandHandler(commandData) {
       this.state.data += commandData;
    }
}

describe('TypeHelpers', () => {
    it('Create object from type', () => {  
        
        expect(createInstance(TestDouble)).toEqual(jasmine.any(TestDouble));
    });

    it('Create object with constructor args from type', () => {  
        // @ts-ignore: constructor error
        let instance = createInstance(TestDoubleWithContructorArgs, "s");
       
        expect(instance).toEqual(jasmine.any(TestDoubleWithContructorArgs));
        expect(instance.state).toEqual("s");
    });
})

import { GenericDummyReducer, CreateTypedReducer, GenericDomainReducer } from "./reduxhelpers";

describe('ReduxHelpers - GenericDummyReducer:', () => {
    let reducer;
    let cmd = { type: "commandHandler" };
    let currentState = new TestDouble();

    beforeEach(() => {
        reducer = CreateTypedReducer(GenericDummyReducer, null, TestDouble);
    });
    
    it('Intial state, to create state', () => {  
        let state =  reducer(undefined, null)
        expect(state).toEqual(jasmine.any(TestDouble));
    });

    it('With passed state, to return state', () => {  
        let newState =  reducer(currentState, null)
        expect(newState).toBe(currentState);
    });
})

describe('ReduxHelpers - GenericDomainReducer:', () => {
    let reducer;
    let cmd = { type: "commandHandler", data:"!" };
    let currentState = new TestDouble();

    beforeEach(() => {
        reducer = CreateTypedReducer(GenericDomainReducer, TestDoubleWithContructorArgs, TestDouble);
    });
    
    it('Intial state, to create state', () => {  
        let state =  reducer(undefined, null)
        expect(state).toEqual(jasmine.any(TestDouble));
    });

    it('With passed state, to return state', () => {    
        let newState =  reducer(currentState, cmd);
        expect(newState.data).not.toBe(currentState);
        expect(newState).toBe(currentState);
    });

    it('Apply command data to state', () => {  
        currentState.data = "test";
        let newState =  reducer(currentState, cmd)
        expect(newState.data).not.toBe(currentState);
        expect(newState.data).toEqual("test!");
    });

    it('Apply command data to state', () => {  
        let cmd = { type: "UnkowmMethod", data:"!" };
       
        expect(reducer(currentState, cmd)).not.toThrow;
    });
})