import {Logger} from "../main/Logger";
import {parseLoggerConfig} from "../main/parseLoggerConfig";
import {createConsoleWriter} from "../main/processors/createConsoleWriter";

describe('parseLoggerConfig', () => {
  it('returns map of loggers', done => {

    const record = {level: Logger.ERROR, messages: ['Hello', 'World!']};
    const fooFactory = function (options) {
      return record => new Promise(resolve => setTimeout(resolve, 500, record));
    };

    const loggers = parseLoggerConfig([
      {
        id: 'logger1',
        channels: [
          {processors: ['#logger2']}
        ]
      },
      {
        id: 'logger2',
        channels: [
          {processors: ['foo', 'writeToConsole']}
        ]
      }
    ],
    {
      foo: fooFactory,
      writeToConsole: createConsoleWriter
    });

    const logger1 = loggers['logger1'];

    logger1.process(record).then(inboundRecord => {
      expect(inboundRecord).toBe(record);
      done();
    });

  });
});
