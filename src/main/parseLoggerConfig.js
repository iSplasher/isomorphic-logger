import {Logger} from './Logger';
import {LogLevel} from './LogLevel';
import toArray from 'lodash/toArray';

export function parseLoggerConfig(
  loggerConfig,
  processorFactories = {}
) {
  const {level, channels} = loggerConfig;
  const logger = new Logger();
  if (level) {
    logger.setLevel(LogLevel.valueOf(level));
  }
  for (const channel of toArray(channels)) {
    const processors = [];
    for (const {type, options} of channel) {
      const processorCreator = processorFactories[type];
      if (type === 'logger') {
        processors.push(parseLoggerConfig(options, processorFactories))
      } else if (!processorCreator) {
        throw new Error(`Unknown processor type "${type}"`);
      } else {
        processors.push(processorCreator(options))
      }
    }
    logger.channel(...processors);
  }
  return logger;
}
