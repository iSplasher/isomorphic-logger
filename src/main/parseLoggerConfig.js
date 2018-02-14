import {Logger} from './Logger';
import {LogLevel} from './LogLevel';

export function parseLoggerConfig(
  loggerConfig,
  processorFactories
) {
  const {level, channels} = loggerConfig;
  const logger = new Logger();
  if (level) {
    logger.setLevel(LogLevel.valueOf(level));
  }
  for (const channel of channels) {
    const processors = [];
    for (const {type, options} of channel) {
      const processorCreator = processorFactories[type];
      if (!processorCreator) {
        throw new Error(`Unknown processor type "${type}"`);
      } else if (processorCreator === Logger) {
        processors.push(parseLoggerConfig(options, processorFactories))
      } else {
        processors.push(processorCreator(options))
      }
    }
    logger.channel(...processors);
  }
  return logger;
}
