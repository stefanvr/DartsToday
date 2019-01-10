import { TestAggregate, CREATE_DATE, COMMMAND_ENABLED, COMMMAND_DISABLED, EVENT_STREAM } from './aggregate.example';

import { AggregateService } from './aggregate.service';
import { Dispatcher } from '../lib/dispatcher'

describe('AggregateService', () => {
  let service: AggregateService;

  beforeEach(() => {
    service = new AggregateService(new Dispatcher());
  });

  it('Command enabled to be false', () => {
    expect(service).toBeTruthy();
  });

  describe('Without active game:', () => {
    it('Command enabled to be false', () => {
      expect(service.commandEnabled("tstDisabledCommand")).toBe(false);
    });

    it('service.execute no to throw', () => {
      expect(service.execute(null)).not.toThrow;
    });
  });

  describe('Execute', () => {
    beforeEach(() => {
      service.intializeNew(CREATE_DATE, TestAggregate);
    });
  
    it('Returns state from aggegrate', () => {
      service.execute(COMMMAND_ENABLED);
  
      expect(service.state.s.customData).toBe("enabled");
    });

    it('Command enabled to be true', () => {
      expect(service.commandEnabled(COMMMAND_ENABLED.action)).toBe(true);
    });

    it('Command enabled to be false', () => {
      expect(service.commandEnabled(COMMMAND_DISABLED.action)).toBe(false);
    });
  });

  describe('executeScenario', () => {
    beforeEach(() => {
      service.executeScenario(EVENT_STREAM, TestAggregate);
    });

    it('Returns replayed state from aggegrate', () => {
      service.execute(COMMMAND_ENABLED);
  
      expect(service.state.s.customData).toBe("enabled");
    });
  });  
});
