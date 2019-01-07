import { TestBed } from '@angular/core/testing';
import { TestAggregate, COMMMAND_ENABLED, COMMMAND_DISABLED } from './testaggregate';
import { Aggregate } from './aggregate'
import { AggregateService } from './aggregate.service';

describe('AggregateService', () => {
  let service: AggregateService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [AggregateService]});
    service = TestBed.get(AggregateService);
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
      service.intializeNew(Aggregate.CreateNew('dt', TestAggregate));
    });
  
    it('Returns state from aggegrate', () => {
      service.execute(COMMMAND_ENABLED);
  
      expect(service.state.s.customData).toBe("enabled");;
    });

    it('Command enabled to be true', () => {
      expect(service.commandEnabled(COMMMAND_ENABLED.action)).toBe(true);
    });

    it('Command enabled to be false', () => {
      expect(service.commandEnabled(COMMMAND_DISABLED.action)).toBe(false);
    });
  });
});
