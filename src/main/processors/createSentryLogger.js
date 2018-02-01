import type {Processor, Record} from '../types/ProcessorType';
import {LogLevel} from '../LogLevel';

// TODO: move to types folder
// TODO: what to do with es6 node_modules?
export type SentryAdapter = {
  captureMessage(message: *, options: *): *;
  captureException(message: *, options: *): *;
};

export function createSentryLogger(sentryAdapter: SentryAdapter): Processor {
  return (records: Record[]) => {
    records.forEach(({level, messages, meta}) => {
      const [message] = messages;
      if (level < LogLevel.ERROR) {
        sentryAdapter.captureMessage(message, {level: level < LogLevel.WARN ? 'info' : 'warn', meta});
      } else {
        sentryAdapter.captureException(message, {level: 'error', meta});
      }
    });
    return records;
  };
}
