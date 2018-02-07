import type {LoggerConfigChannel, LoggerConfigParserResult, LoggersConfig} from './types/LoggerConfigType';
import type {ProcessorFactories} from './types/ProcessorType';
import {Logger} from './Logger';
import {LogLevel} from './LogLevel';
import {PROCESSOR_FACTORIES} from './index';

export function createLoggerFromConfig(
  channels: LoggerConfigChannel[],
  processorFactories: ProcessorFactories
) {
  const logger = new Logger();
  for (const channel of channels) {
    if (LogLevel[channel.level] === undefined) {
      throw new Error(`Unknown log level "${channel.level}"`);
    }
    const createdProcessors = [];
    for (const {type, options} of channel.processors) {
      const processorCreator = processorFactories[type];
      if (!processorCreator) {
        throw new Error(`Unknown processor type "${type}"`);
      } else if (processorCreator === Logger) {
        createdProcessors.push(createLoggerFromConfig(options.channels, processorFactories))
      } else {
        createdProcessors.push(processorCreator(options))
      }
    }
    logger.channel(LogLevel[channel.level.toUpperCase()], ...createdProcessors);
  }
  return logger;
}

export function parseLoggersConfig(
  loggersConfig: LoggersConfig,
  processorFactories: ProcessorFactories = PROCESSOR_FACTORIES,
  loggerCreator = createLoggerFromConfig
): LoggerConfigParserResult {
  const loggers = {};
  for (const {id, channels} of loggersConfig) {
    if (!id) {
      throw new Error(`Id is required for top-level loggers`);
    }
    if (!Array.isArray(channels)) {
      throw new Error(`No channels specified for logger with id "${id}"`);
    }
    loggers[id] = loggerCreator(channels, processorFactories);
  }
  return loggers;
}
