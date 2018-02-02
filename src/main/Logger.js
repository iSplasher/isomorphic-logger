import type {LoggerLogLevel, LoggerChannel, LogResult} from './types/LoggerType'
import type {Processor, Record} from './types/ProcessorType';
import {LogLevel} from './LogLevel';

// TODO: Help Needed: flow - errors
// TODO: Help Needed: Sentry - react-native has es6 in node_modules
// TODO: Help Needed: Logger.level doesn't exist anymore?
// TODO: tests
// TODO: web - finish moving logger, create config
// TODO: android - finish moving logger, create config

export class Logger {

  channels: LoggerChannel[] = [];

  /**
   * Creates logging channel that consists of a list of processors.
   *
   * Processor is a function that accepts an array of records `{level, messages}` and returns another
   * array of records for consequent processors to work with. If processor returns a promise then logging
   * channel is suspended until this promise is resolved.
   *
   * Instead of an object with `process` method can be provided.
   *
   * @returns {Logger}
   */
  channel(level: LoggerLogLevel, ...processors: Processor[]): this {
    processors = processors.map(processor => {
      if (typeof processor === 'function') {
        return processor;
      }
      if (processor && processor.process) {
        return ::processor.process;
      }
      throw new Error('Processor should be a function or an object with `process` callback');
    });

    this.channels.push({level, processors, promise: null, pendingCount: 0});
    return this;
  }

  /**
   * Process records through pipeline.
   *
   * @param {Array} records
   * @return {Promise|null}
   */
  process(records: Record[]): LogResult {
    const promises = [];

    for (const channel of this.channels) {
      let value: Record[] = records.filter(record => record.level >= channel.level);

      if (value.length) {
        if (channel.pendingCount > 0) {
          value = Promise.resolve(value);
        }
        for (const processor of channel.processors) {
          if (value instanceof Promise) {
            value = value.then(records => records && processor(records));
          } else {
            value = processor(value);
            if (!value) {
              break;
            }
          }
        }
        if (value instanceof Promise) {
          const decrease = () => {channel.pendingCount -= 1};

          value = value.then(decrease, error => {
            console.log(error);
            decrease();
          });

          if (channel.pendingCount > 0 && channel.promise instanceof Promise) {
            channel.promise = channel.promise.then(() => value);
          } else {
            channel.promise = value;
          }
          channel.pendingCount += 1;
        }
      }

      if (channel.pendingCount > 0) {
        promises.push(channel.promise);
      }
    }
    if (promises.length) {
      return Promise.all(promises).then(() => null);
    }
    return null;
  }

  /**
   * Send messages to channels of this logger.
   *
   * @param {Number} level Level to log provided messages with.
   * @param {Array} messages Messages to pass to processors.
   * @param {Object} [meta] Any additional meta passed to processors.
   *
   * @returns {Promise} Promise that resolves when all channels did process provided messages.
   */
  log(level: LoggerLogLevel, messages: Array<*>, meta: *): LogResult {
    return this.process([{level, messages, meta}]);
  }

  trace(...messages: *): LogResult {
    return this.log(LogLevel.TRACE, messages);
  }

  debug(...messages: *): LogResult {
    return this.log(LogLevel.DEBUG, messages);
  }

  info(...messages: *): LogResult {
    return this.log(LogLevel.INFO, messages);
  }

  warn(...messages: *): LogResult {
    return this.log(LogLevel.WARN, messages);
  }

  error(...messages: *): LogResult {
    return this.log(LogLevel.ERROR, messages);
  }
}
