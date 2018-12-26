interface Player {
    name:string;
}

export class ScoreState {
    constructor(
        public players:Player[]) { }
}

export enum DartState { noscore, score}

export class TurnState {
    constructor(
        public turn:number,
        public dart:DartState[]) { }
}

export class GameState {
    public createAt:Date;
    public startedAt:Date;

    public turnState: TurnState = null;
    public scoreState: ScoreState = null;
}