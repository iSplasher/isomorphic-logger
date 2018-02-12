// @flow

// TODO: merge types files (have a single file instead of multiple, "LoggerType.js")

// TODO: extract processor types to processors implementation files.

import type {Processor, Record} from './ProcessorType';

export type Awaitable<T> = Promise<T> | T;

// TODO: remove

export type LogResult = Awaitable<null>;

export type LoggerChannel = {
  processors: Processor[];
  promise: Promise<Record[]> | null;
  pendingCount: number;
};
