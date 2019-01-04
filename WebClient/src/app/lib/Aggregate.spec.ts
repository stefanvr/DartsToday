import { Aggregate, ActionObject, CMD_UNDO } from '../lib/Aggregate';

const COMMAND_TO_CONVERT  = -1;

class TestGame implements  ActionObject
{
    enabledActions: any[];
    state: any = { createdAt: null, customData: null, payload: null }
    
    convertAction(command) {
       return command === COMMAND_TO_CONVERT ? "convertedCommand" : command; 
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ "enabledCommand", COMMAND_TO_CONVERT, "unkownHandler", CMD_UNDO ]
    }
    
    disabledCommand(event) {  
        this.state.customData = "disabled";
    }

    enabledCommand(event) {  
        this.state.customData = "enabled";
        this.state.payload = event.payload;
    }

    convertedCommand(event) { 
        this.state.customData = "converted";
    }
}

let createDate = new Date(Date.now()).toISOString();
let es = { events: [{ action: "initialized", createdAt: createDate}, {action: "enabledCommand"}]};

describe('Aggregate newly created', () => {
    let root: Aggregate;

    beforeEach(() => {
        root = Aggregate.CreateNew(createDate, TestGame);
    });

    it('Initialisation trigger by passing createdAt to state', () => {
        expect(root.state().createdAt).toBe(createDate);
    });

    it('Custom event, not enabled, to be skipped', () => {
        root.execute({action: "disabledCommand"});
        expect(root.state().customData).toBeNull();
    });

    it('Custom event, enabled, to be processed', () => {
        root.execute({action: "enabledCommand"});
        expect(root.state().customData).toBe("enabled");
    });

    it('Custom event, payload, to be processed', () => {
        let payload = "my payload";
        root.execute({action: "enabledCommand", payload: payload});
        expect(root.state().payload).toBe(payload);
    });

    it('Unkown handler, does not throw', () => {
        // Currently trust test suite as this would indicate bug.
        // Error is logged for troubleshooting.
        expect(root.execute({action: "unkownHandler"})).not.toThrow;
    });

    
    it('Custom event, payload, to be processed', () => {
        let payload = "my payload";
        root.execute({action: COMMAND_TO_CONVERT});
        expect(root.state().customData).toBe("converted");
    });

    it('OnEvent, with domain command, emits events', (done: DoneFn) => {
        let cmd = { action: "enabledCommand" }
        root.onEvent.subscribe(event => {
                expect(event).toEqual(cmd);
                done();
        });
        root.execute(cmd);
    });

    it('OnEvent, with undo, emits events', (done: DoneFn) => {
        let cmd = { action: CMD_UNDO }
        root.onEvent.subscribe(event => {
                expect(event).toEqual(cmd);
                done();
        });
        root.execute(cmd);
    });

    describe('Persistance:', () => {
      it('The eventSource contains Initialized event', () => {
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}]});
      });

      it('The eventSource contains, after Custom event, initialized and command event', () => {
          root.execute({action: "enabledCommand"});
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}, {action: "enabledCommand"}]});
      });

      it('The eventSource contains, after Custom event and undot, initialized event', () => {
        root.execute({action: "enabledCommand"});
        root.execute({action: CMD_UNDO });
        expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}]});
    });

    });
});

describe('Aggregate loaded from events', () => {
    let root: Aggregate;
    
    beforeEach(() => {
        root =  Aggregate.CreateFromEs(es, TestGame);
    });

    it('Initialisation event is processed and passed createdAt to state', () => {
        expect(root.state().createdAt).toBe(createDate);
    });
  
    it('Custom event is processed and passed to custom data ', () => {
        expect(root.state().customData).toBe("enabled");
    });
});
