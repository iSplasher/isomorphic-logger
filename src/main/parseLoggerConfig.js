import isString from 'lodash/isString';
import {Logger} from './Logger';

export function parseLoggerConfig(config, processorFactories = {}) {
  const loggers = {};
  for (const {id, channels} of config) {
    const logger = new Logger;

    for (const {id, processors: factories} of channels) {
      const processors = [];

      for (let factory of factories) {
        if (isString(factory)) {
          // Reference to another logger in configuration.
          if (factory.indexOf('#') == 0) {
            const id = factory.substring(1);
            processors.push(record => loggers[id].process(record));
            continue;
          }
          factory = {id: factory};
        }
        const {id, ...options} = factory;
        if (id in processorFactories) {
          processors.push(processorFactories[id](options));
        } else {
          throw new Error(`Factory ${id} could not be found`);
        }
      }

      if (isString(id)) {
        logger.appendChannel(id, processors);
      } else {
        logger.appendChannel(processors);
      }
    }
    loggers[id] = logger;
  }
  return loggers;
}
