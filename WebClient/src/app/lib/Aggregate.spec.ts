import { Aggregate, ActionObject } from '../lib/Aggregate';

class TestGame implements  ActionObject
{
    enabledActions: any[];
    gameState: any = { createdAt: null, customData: null, payload: null }
    
    convertAction(command) {
       return command === 0 ? "convertedCommand" : command; 
    }

    initialized(event) {  
        this.gameState.createdAt = event.createdAt;
        this.enabledActions = [ "enabledCommand", 0 ]
    }
    
    disabledCommand(event) {  
        this.gameState.customData = "disabled";
    }

    enabledCommand(event) {  
        this.gameState.customData = "enabled";
        this.gameState.payload = event.payload;
    }

    convertedCommand(event) { 
        this.gameState.customData = "converted";
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

    
    it('Custom event, payload, to be processed', () => {
        let payload = "my payload";
        root.execute({action: 0});
        expect(root.state().customData).toBe("converted");
    });

    describe('Persistance:', () => {
      it('The eventSource contains Initialized event', () => {
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}]});
      });

      it('The eventSource contains, after Custom event, initialized and command event', () => {
          root.execute({action: "enabledCommand"});
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: createDate}, {action: "enabledCommand"}]});
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
