export type LoggerLogLevel = number;

export type Record = {
  level: LoggerLogLevel;
  messages: Array<*>;
  meta: *;
};

export type Processor = (records: Record<>) => ProcessorResult | {
  process(records: Record<>): ProcessorResult;
};

export type ProcessorResult = Record<> | Promise;

export type ProcessorCreator = (...args: *) => Processor;

export type ProcessorFactoryMap = {
  [processorName: string]: ProcessorCreator
};

export type LogResult = Promise | null;

export type Channel = {
  level: LoggerLogLevel;
  processors: Processor[];
  promise: Promise | null;
  pendingCount: number;
};

// TODO: LoggerConfig
//export type LoggerConfig = {};
