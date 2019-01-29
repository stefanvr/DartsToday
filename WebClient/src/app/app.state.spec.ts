import { createCommmand } from "./app.state";
import { ActionsCricket } from './DartsToday/CricketGame';

describe('AppComponent', () => {
  let data = { data : "somedata" }
  let cmd;

  describe('Create command with enum (number value):', () => {
    beforeEach(() => {
        cmd = createCommmand(ActionsCricket.score, data)
    });
     
    it(' returns type with command name (string value)', () => {
        expect(cmd.type).toEqual("score");
    });
    
    it(' returns data set', () => {
        expect(cmd.data).toEqual(data);
    });
  });
  
  it('Create command without data, does not throw error (nor sets data)', () => {
      let cmd = createCommmand(ActionsCricket.score);
      expect(cmd.data).toEqual(null);
  });
});