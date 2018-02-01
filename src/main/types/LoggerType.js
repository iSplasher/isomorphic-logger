// @flow
import type {Processor} from './ProcessorType';

export type LoggerLogLevel = number;

export type Logger = {
  error(...messages: *): *;
  trace(...messages: *): *;
  debug(...messages: *): *;
  info(...messages: *): *;
  warn(...messages: *): *;
};

export type LoggerChannel = {
  level: LoggerLogLevel;
  processors: Processor[];
  promise: Promise<*> | null;
  pendingCount: number;
};

export type LogResult = Promise<*> | null;
