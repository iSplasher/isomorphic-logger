// @flow
import {LogLevel} from '../LogLevel';

export type Awaitable<T> = Promise<T> | T;

export type Messages = Array<*>;

export type Record = {
  level: LogLevel;
  messages: Messages;
  meta: *;
};

export type ProcessorResult = ?Awaitable<?Record[]>;

export type Processor =
  (records: Record[]) => ProcessorResult;

export type Channel = {
  processors: Processor[];
  promise: ?Promise<?Record[]>;
}
