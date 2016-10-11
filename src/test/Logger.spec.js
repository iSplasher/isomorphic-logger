import {Logger} from "../main/Logger";

describe('Logger.channel', () => {
  it('accept functions', () => {

    const foo = record => record;
    const logger = new Logger;
    logger.appendChannel('foo', foo);

    expect(logger.channels).toEqual([{id: 'foo', processors: [foo]}]);
  });

  it('accept Loggers', done => {

    const foo = record => done();
    const logger1 = new Logger;
    const logger2 = new Logger;
    logger1.appendChannel(logger2);
    logger2.appendChannel('foo', foo);

    logger1.log('bar');
  });

  it('asynchronous processor', done => {

    const record = {level: Logger.ERROR, messages: []};
    const foo = record => new Promise(resolve => setTimeout(resolve, 500, record));
    const logger1 = new Logger;
    const logger2 = new Logger;
    logger1.appendChannel(logger2);
    logger2.appendChannel('foo', foo);

    logger1.process(record).then(inboundRecord => {
      expect(inboundRecord).toBe(record);
      done();
    });
  });
});
