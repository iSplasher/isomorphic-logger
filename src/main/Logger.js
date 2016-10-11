import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import flatten from 'lodash/flatten';
import remove from 'lodash/remove';

export class Logger {

  static TRACE = 0;
  static DEBUG = 1;
  static INFO = 2;
  static WARN = 3;
  static ERROR = 4;
  static OFF = 99;

  level = Logger.TRACE;

  channels = [];

  /**
   * Creates logging channel that consists of a list of processors.
   *
   * Processor is a function that accepts an object `{level, messages}` and returns a new object
   * with the same structure for consequent processors to work with. If processor returns a promise
   * then logging channel is suspended until this promise is resolved.
   *
   * Instead of a processor function another `Logger` instance can be provided.
   *
   * @param {String} [id] Name of this channel. If channel with given name already exists in logger
   *        it would be overwritten.
   * @param {...(Function|Logger|Array.<Function|Logger>)} processors List of processors to add.
   * @returns {Logger}
   */
  appendChannel(id, ...processors) {
    const channel = {};

    if (isString(id)) {
      channel.id = id;
      remove(this.channels, {id});
    } else {
      processors.unshift(id);
    }

    channel.processors = flatten(processors).map(processor => {
      if (isFunction(processor)) {
        return processor;
      }
      if (processor instanceof Logger) {
        // Processor should send data to another logger.
        return ::processor.process;
      }
      throw new Error('Channel should contain function or Logger instances');
    });

    if (channel.processors.length) {
      this.channels.push(channel);
    }
    return this;
  }

  /**
   * Processes record via sending its messages to channels defined for this logger
   * and it child loggers if record level is sufficient.
   *
   * @returns {Promise} Promise that resolves with originally provided record after
   *          all channels complete their work.
   */
  process(record) {
    if (record.level < this.level) {
      // Insufficient logging level requested.
      return Promise.resolve(record);
    }
    const futures = [];
    for (const {processors} of this.channels) {
      let payload = {...record};

      for (const processor of processors) {
        if (payload instanceof Promise) {
          // Enqueue asynchronous processors and ensure they do nothing if
          // preceding processor did not return record object.
          payload = payload.then(record => record && processor(record));
        } else {
          payload = processor(payload);
          if (!payload) {
            // Synchronous record processing was interrupted.
            break;
          }
        }
      }
      if (payload instanceof Promise) {
        futures.push(payload);
      }
    }
    return Promise.all(futures).then(() => record);
  }

  isTraceEnabled() {
    return this.level >= Logger.TRACE;
  }

  isDebugEnabled() {
    return this.level >= Logger.DEBUG;
  }

  isInfoEnabled() {
    return this.level >= Logger.INFO;
  }

  isWarnEnabled() {
    return this.level >= Logger.WARN;
  }

  isErrorEnabled() {
    return this.level >= Logger.ERROR;
  }

  trace(...messages) {
    return this.process({level: Logger.TRACE, messages});
  }

  debug(...messages) {
    return this.process({level: Logger.DEBUG, messages});
  }

  // Convenient alias
  log() {
    return this.info.apply(this, arguments);
  }

  info(...messages) {
    return this.process({level: Logger.INFO, messages});
  }

  warn(...messages) {
    return this.process({level: Logger.WARN, messages});
  }

  error(...messages) {
    return this.process({level: Logger.ERROR, messages});
  }
}
