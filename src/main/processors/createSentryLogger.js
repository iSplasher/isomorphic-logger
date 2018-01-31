import type {Processor, Record} from '../types/LoggerType';
import {LogLevel} from '../LogLevel';

export type RavenApi = {
  captureMessage(message: *, options: *): *;
  captureException(message: *, options: *): *;
};

export function createSentryLogger(Raven: RavenApi): Processor {
  return (records: Record[]) => {
    records.forEach(({level, messages, meta}) => {
      const [message] = messages;
      if (level < LogLevel.ERROR) {
        Raven.captureMessage(message, {level: level < LogLevel.WARN ? 'info' : 'warn', meta});
      } else {
        Raven.captureException(message, {level: 'error', meta});
      }
    });
    return records;
  };
}
