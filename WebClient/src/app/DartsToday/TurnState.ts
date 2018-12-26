export enum DartState { noscore, score}

export class TurnState {
    constructor(
        public turn:number,
        public dart:DartState[]) { }
}