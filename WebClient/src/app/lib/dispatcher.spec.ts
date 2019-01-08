import { AggregateService } from './aggregate.service';
import { Dispatcher } from './dispatcher';
import { TestAggregate, CREATE_DATE, COMMMAND_ENABLED, PAYLOAD } from './aggregate.example';

describe('Dispatcher', () => {
  let serviceA: AggregateService;
  let serviceB: AggregateService;

  beforeEach(() => {
    let dispatcher = new Dispatcher();
    serviceA = new AggregateService(dispatcher);
    serviceB = new AggregateService(dispatcher);
    serviceA.intializeNew(CREATE_DATE, TestAggregate);
    serviceB.intializeNew(CREATE_DATE, TestAggregate);
  });

  it('Command enabled to be false', () => {
    serviceA.execute(COMMMAND_ENABLED);

    expect(serviceB.state.s.eventData).toBe("FROM event: " + PAYLOAD);
  });
});
