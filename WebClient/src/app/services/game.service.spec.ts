import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [GameService]});
    service = TestBed.get(GameService);
  });

  it('Command enabled to be false', () => {
    expect(service).toBeTruthy();
  });

  describe('Without active game:', () => {
    it('Command enabled to be false', () => {
      expect(service.commandEnabled("tstDisabledCommand")).toBe(false);
    });
  });

  describe('Execute', () => {
    let testState = { test: "teststatevalue" }
    let testCmd ={ command: "command" };

    let aggregateSpy;
  
    beforeEach(() => {
      aggregateSpy = jasmine.createSpyObj('Aggregate', ['execute', 'state', 'enabledActions']);
      service.testSet(aggregateSpy);
    });

    it('Applies command on aggegrate', () => {     
      service.execute( testCmd );
  
      expect(aggregateSpy.execute.calls.count())
        .toBe(1, 'spy method was called once');
      expect(aggregateSpy.execute.calls.mostRecent().args[0])
        .toBe(testCmd);
    });
  
    it('Returns state from aggegrate', () => {
      aggregateSpy.state.and.returnValue(testState);
  
      service.execute( testCmd );
  
      expect(service.state.s).toBe(testState);
    });

    it('Command enabled to be true', () => {
      aggregateSpy.enabledActions.and.returnValue(['tstEnabledCommand']);
  
      expect(service.commandEnabled("tstEnabledCommand")).toBe(true);
    });

    it('Command enabled to be false', () => {
      aggregateSpy.enabledActions.and.returnValue([]);
  
      expect(service.commandEnabled("tstDisabledCommand")).toBe(false);
    });
  });
});
