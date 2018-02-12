// @flow

// TODO: merge types files (have a single file instead of multiple, "LoggerType.js")

// TODO: extract processor types to processors implementation files.

import type {Processor, Record} from './ProcessorType';

type Awaitable<T> = Promise<T> | T;

// TODO: remove
export type LoggerLogLevel = number;

export type LogResult = Awaitable<null>;

export type Logger = {
  error(...messages: *): LogResult;
  trace(...messages: *): LogResult;
  debug(...messages: *): LogResult;
  info(...messages: *): LogResult;
  warn(...messages: *): LogResult;
};

export type LoggerChannel = {
  level: LoggerLogLevel;
  processors: Processor[];
  promise: Promise<Record[]> | null;
  pendingCount: number;
};
