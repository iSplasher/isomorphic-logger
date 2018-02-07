import {parseLoggersConfig, createLoggerFromConfig} from '../main/parseLoggersConfig';
import {Logger} from '../main/Logger';

jest.mock('../main/Logger', () => {
  const Logger = jest.fn();
  Logger.prototype.channel = jest.fn();
  return {Logger};
});

describe('parseLoggersConfig', () => {

  it(`throws an error when no logger "id" is passed`, () => {
    expect(() => parseLoggersConfig([{channels: []}])).toThrow()
  });

  it(`throws an error when no logger channels are passed`, () => {
    expect(() => parseLoggersConfig([{id: 'foo'}])).toThrow();
    expect(() => parseLoggersConfig([{id: 'foo', channels: {}}])).toThrow();
  });

  it(`iterates over a config, validates config properties and passes them to logger creator function`, () => {
    const loggerCreator = jest.fn();
    parseLoggersConfig([{id: 'foo', channels: []}], {bar: 'baz'}, loggerCreator);
    expect(loggerCreator).lastCalledWith([], {bar: 'baz'});
  });

  it(`creates a map with loggers`, () => {
    const result = parseLoggersConfig([{id: 'foo', channels: []}], {}, () => ({bar: 'baz'}));
    expect(result).toEqual({foo: {bar: 'baz'}});
  });
});

describe('createLoggerFromConfig', () => {

  it(`returns a logger instance`, () => {
    expect(createLoggerFromConfig([], {})).toBeInstanceOf(Logger);
  });

  it(`throws an error if invalid channel.level is passed`, () => {
    expect(() => createLoggerFromConfig([{level: 'foo'}], {})).toThrow();
  });

  it(`throws an error if unknown channel.processor is passed`, () => {
    expect(() => createLoggerFromConfig([{
      level: 'INFO',
      processors: ['foo']
    }], {})).toThrow();
  });

  it(`invokes processor creator with options`, () => {
    const processorCreator = jest.fn();
    createLoggerFromConfig([{
      level: 'TRACE',
      processors: [{
        type: 'foo',
        options: {
          bar: 'baz'
        }
      }]
    }], {
      foo: processorCreator
    });
    expect(processorCreator).lastCalledWith({bar: 'baz'});
  });

  it(`invokes self (recursively) if a processor creator is Logger`, () => {
    const mockedLoggerCreator = jest.fn(createLoggerFromConfig);
    mockedLoggerCreator([{
      level: 'INFO',
      processors: [{
        type: 'logger',
        options: {
          channels: [{
            level: 'DEBUG',
            processors: []
          }],
        }}]
    }], {
      logger: Logger,
      foo: () => 'bar'
    });

    expect(Logger.prototype.channel).lastCalledWith(2, new Logger)
  });

  it(`makes an array of processors and pass them to logger.channel function`, () => {
    createLoggerFromConfig([{
      level: 'INFO',
      processors: [
        {type: 'foo'},
        {type: 'bar'},
        {type: 'baz'}
      ]
    }], {
      foo() {return 'foo'},
      bar() {return 'bar'},
      baz() {return 'baz'}
    });

    expect(Logger.prototype.channel).lastCalledWith(2, 'foo', 'bar', 'baz');
  });
});
