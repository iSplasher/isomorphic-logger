// @flow
import { Logger } from "../logger";
import { LogLevel } from "../loglevel";

export type Awaitable<T> = Promise<T> | T;

export type Messages = Array<any>;

export type Record = {
  level: LogLevel;
  messages: Messages;
  meta: any;
};

export type ProcessorResult = Awaitable<Record[] | undefined> | undefined;

export type Processor = (records: Record[]) => ProcessorResult;

export type ProcessorObject = { process: Processor };

export type ProcessorLike = Processor | ProcessorObject | Logger;

export type Channel = {
  processors: Processor[];
  promise: Promise<Record[] | undefined> | undefined;
};
