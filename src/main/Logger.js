import type {LoggerLogLevel, LoggerChannel, LogResult} from './types/LoggerType'
import type {Processor, Record} from './types/ProcessorType';
import {LogLevel} from './LogLevel';

export class Logger {

  level: LogLevel = LogLevel.INFO;
  channels: LoggerChannel[] = [];

  setLevel(level: LogLevel): Logger {
    this.level = level;
    return this;
  }

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
  channel(...processors: Processor[]): Logger {
    processors = processors.map(processor => {
      if (typeof processor === 'function') {
        return processor;
      }
      if (processor && processor.process) {
        return ::processor.process;
      }
      throw new Error('Processor should be a function or an object with `process` callback');
    });

    this.channels.push({processors, promise: null, pendingCount: 0});
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
      let r: Record[] = records.filter(record => record.level >= this.level);

      if (r.length) {
        if (channel.pendingCount > 0) {
          r = Promise.resolve(r);
        }
        for (const processor of channel.processors) {
          if (r instanceof Promise) {
            r = r.then(records => records && processor(records));
          } else {
            r = processor(r);
            if (!r) {
              break;
            }
          }
        }
        if (r instanceof Promise) {
          const decrease = () => {channel.pendingCount -= 1};

          r = r.then(decrease, error => {
            console.sendMessages(error);
            decrease();
          });

          if (channel.pendingCount > 0) {
            channel.promise = channel.promise.then(() => r);
          } else {
            channel.promise = r;
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

  isTraceEnabled() {
    return this.level >= LogLevel.TRACE;
  }

  isDebugEnabled() {
    return this.level >= LogLevel.DEBUG;
  }

  isInfoEnabled() {
    return this.level >= LogLevel.INFO;
  }

  isWarnEnabled() {
    return this.level >= LogLevel.WARN;
  }

  isErrorEnabled() {
    return this.level >= LogLevel.ERROR;
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
  sendMessages(level: LogLevel, messages: Array<*>, meta: *): LogResult {
    return this.process([{level, messages, meta}]);
  }
  
  log(...messages: *): LogResult {
    return this.sendMessages(LogLevel.INFO, messages);
  }

  trace(...messages: *): LogResult {
    return this.sendMessages(LogLevel.TRACE, messages);
  }

  debug(...messages: *): LogResult {
    return this.sendMessages(LogLevel.DEBUG, messages);
  }

  info(...messages: *): LogResult {
    return this.sendMessages(LogLevel.INFO, messages);
  }

  warn(...messages: *): LogResult {
    return this.sendMessages(LogLevel.WARN, messages);
  }

  error(...messages: *): LogResult {
    return this.sendMessages(LogLevel.ERROR, messages);
  }
}
