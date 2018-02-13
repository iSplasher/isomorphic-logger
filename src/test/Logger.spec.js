import delay from 'delay';
import {Logger} from '../main/Logger';
import {LogLevel} from '../main/LogLevel';

describe(`Logger.channel`, () => {

  it('creates channel in logger when function processor is provided', () => {
    const logger = new Logger;
    const processor = records => null;

    expect(logger.channel(processor)).toBe(logger);

    expect(logger.channels).toEqual([{
      processors: [processor],
      promise: null,
      pendingCount: 0
    }]);
  });

  it('creates channel in logger when object with `process` method is provided', done => {
    const logger = new Logger;
    const processor = records => done();

    expect(logger.channel(processor)).toBe(logger);
    logger.channels[0].processors[0]();
  });
});

describe(`Logger.process`, () => {

  it('returns `null` for synchronous processors', () => {
    const trap = [];
    const records = [{level: LogLevel.TRACE, messages: ['foo']}];
    const logger = new Logger;
    logger.setLevel(LogLevel.TRACE);

    const processor = records => trap.push(...records);

    logger.channel(processor);

    expect(logger.process(records)).toBeNull();
    expect(trap).toEqual(records);
  });

  it('returns `Promise` for asynchronous processors', async done => {
    const trap = [];
    const records = [{level: LogLevel.TRACE, messages: ['foo']}];
    const logger = new Logger;
    logger.setLevel(LogLevel.TRACE);
    const processor = async records => {
      await delay(100);
      trap.push(...records);
    };

    logger.channel(processor);

    const promise = logger.process(records);
    expect(promise instanceof Promise).toBeTruthy();

    expect(await promise).toBeNull();
    expect(trap).toEqual(records);
    done();
  });

});
