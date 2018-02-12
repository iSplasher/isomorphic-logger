import type {Processor, Record} from '../types/ProcessorType';
import {LogLevel} from '../LogLevel';

export function createSentryProcessor(sentry): Processor {
  return (records: Record[]) => {
    for (const {level, messages, meta} of records) {
      const [message] = messages;
      if (level < LogLevel.ERROR) {
        sentry.captureMessage(message, {level: level < LogLevel.WARN ? 'info' : 'warn', meta});
      } else {
        sentry.captureException(message, {level: 'error', meta});
      }
    }
    return records;
  };
}
