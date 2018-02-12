// @flow
import type {Logger, LoggerLogLevel} from './LoggerType';

export type Record = {
  level: LoggerLogLevel;
  messages: Array<*>;
  meta?: *;
};

export type ProcessorOptions = *;

export type ProcessorCreator = (options:? ProcessorOptions) => Processor;

export type Processor = (records: Record[] | Promise<Record[]>) => ProcessorResult | {
  process(records: Record[]): ProcessorResult;
};

export type ProcessorResult = Record[] | Promise<Record[]>;

export type ProcessorFactories = {
  [processorId: string]: ProcessorCreator | Logger;
};

