import { Aggregate, CMD_UNDO } from './aggregate';
import { TestAggregate, CREATE_DATE, PAYLOAD, COMMAND_TO_CONVERT, COMMMAND_ENABLED, COMMMAND_DISABLED, COMMMAND_UNKOWN } from './aggregate.example';

let es = { events: [{ action: "initialized", createdAt: CREATE_DATE}, {action: "enabledCommand"}]};

describe('Aggregate newly created', () => {
    let root: Aggregate;

    beforeEach(() => {
        root = Aggregate.CreateNew(CREATE_DATE, TestAggregate);
    });

    it('Initialisation trigger by passing createdAt to state', () => {
        expect(root.state().createdAt).toBe(CREATE_DATE);
    });

    it('Custom event, not enabled, to be skipped', () => {
        root.execute(COMMMAND_DISABLED);
        expect(root.state().customData).toBeNull();
    });

    it('Custom event, enabled, to be processed', () => {
        root.execute(COMMMAND_ENABLED);
        expect(root.state().customData).toBe("enabled");
    });

    it('Custom event, payload, to be processed', () => {
        root.execute(COMMMAND_ENABLED);
        expect(root.state().payload).toBe(PAYLOAD);
    });

    it('Unkown handler, does not throw', () => {
        // Currently trust test suite as this would indicate bug.
        // Error is logged for troubleshooting.
        expect(root.execute(COMMMAND_UNKOWN)).not.toThrow;
    });
    
    it('Custom event, payload, to be processed', () => {
        root.execute(COMMAND_TO_CONVERT);
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

    it('Recieving  myevent, payload, to be processed', () => {
        let payload = "my payload";
        root.eventHandler({action: "myEvent", data: payload});
        expect(root.state().eventData).toBe(payload);
    });

    it('Unkown event, does not throw', () => {
        expect(root.eventHandler({action: "unkownHandler"})).not.toThrow;
    });

    describe('Persistance:', () => {
      it('The eventSource contains Initialized event', () => {
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: CREATE_DATE}]});
      });

      it('The eventSource contains, after Custom event, initialized and command event', () => {
          root.execute({action: "enabledCommand"});
          expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: CREATE_DATE}, {action: "enabledCommand"}]});
      });

      it('The eventSource contains, after Custom event and undot, initialized event', () => {
        root.execute({action: "enabledCommand"});
        root.execute({action: CMD_UNDO });
        expect(root.eventSource()).toEqual({ events: [{ action: "initialized", createdAt: CREATE_DATE}]});
      });
    });
});

describe('Aggregate loaded from events', () => {
    let root: Aggregate;
    
    beforeEach(() => {
        root =  Aggregate.CreateFromEs(es, TestAggregate);
    });

    it('Initialisation event is processed and passed createdAt to state', () => {
        expect(root.state().createdAt).toBe(CREATE_DATE);
    });
  
    it('Custom event is processed and passed to custom data ', () => {
        expect(root.state().customData).toBe("enabled");
    });
});
