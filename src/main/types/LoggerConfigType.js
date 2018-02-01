// @flow
import type {Logger} from './LoggerType';
import type {ProcessorOptions} from './ProcessorType';

export type LoggerConfigChannelLevel = string;

export type LoggerConfigChannelProcessor = {
  type: string;
  options?: LoggerConfig | ProcessorOptions;
};

export type LoggerConfigChannel = {
  level: LoggerConfigChannelLevel;
  processors: LoggerConfigChannelProcessor[];
};

export type LoggerConfig = {
  id: string;
  channels: LoggerConfigChannel[];
};

export type LoggersConfig = LoggerConfig[];

export type LoggerConfigParserResult = {
  [loggerId: string]: Logger;
}
