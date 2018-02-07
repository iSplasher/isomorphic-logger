import type {Processor, Record} from '../types/ProcessorType';
import type {SentryAdapter} from '../types/processors/SentryType';
import {LogLevel} from '../LogLevel';

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
