export const PLAYER1 = {"name":"player 1"}
export const PLAYER2 = {"name":"player 2"}

export const STARTED_AT = "2018-12-30T20:00:24.301Z";

export const STARTED_GAME = { events: [
  {"action": "addPlayer", "player": PLAYER1},
  {"action": "addPlayer", "player": PLAYER2},
  {"action": "startGame", "startedAt": STARTED_AT }
]};

export const PLAYER1_WIN_GAME = { events: [
    {"action":"initialized","createdAt":"2018-12-30T20:00:24.299Z"},
    {"action":"addPlayer","player": PLAYER1},
    {"action":"addPlayer","player": PLAYER2},
    {"action":"startGame","startedAt":"2018-12-30T20:00:24.301Z"},
    {"action":"score","score":20,"multiplier":3},
    {"action":"score","score":19,"multiplier":3},
    {"action":"score","score":18,"multiplier":3},
    {"action":"endTurn"},
    {"action":"endTurn"},
    {"action":"score","score":17,"multiplier":3},
    {"action":"score","score":16,"multiplier":3},
    {"action":"score","score":15,"multiplier":3},
    {"action":"endTurn"},
    {"action":"endTurn"},
    {"action":"score","score":25,"multiplier":2},
    {"action":"score","score":25,"multiplier":1},
    {"action":"endTurn"}
]};

// 20 Closed, player 1: 17, triple, 19 double, 18 single score
export const GAME_STATES_GAME_ROUND = 2;
export const GAME_STATES_GAME = { events: [
    {"action":"initialized","createdAt":"2018-12-30T20:00:24.299Z"},
    {"action":"addPlayer","player": PLAYER1},
    {"action":"addPlayer","player": PLAYER2},
    {"action":"startGame","startedAt":"2018-12-30T20:00:24.301Z"},
    {"action":"score","score":20,"multiplier":3},
    {"action":"score","score":17,"multiplier":3},
    {"action":"endTurn"},
    {"action":"score","score":20,"multiplier":3},
    {"action":"endTurn"},
    {"action":"score","score":19,"multiplier":2},
    {"action":"score","score":18,"multiplier":1}
]};