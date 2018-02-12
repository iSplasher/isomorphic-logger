// @flow
import {LogLevel} from '../LogLevel';

export type Record = {
  level: LogLevel;
  messages: Array<*>;
  meta?: *;
};

export type Processor = (records: Record[] | Promise<Record[]>) => ProcessorResult | {
  process(records: Record[]): ProcessorResult;
};

export type ProcessorResult = Record[] | Promise<Record[]>;
