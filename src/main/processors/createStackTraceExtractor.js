/**
 * Creates log processor that replaces error messages with their stack trace and crops excessive Webpack paths.
 */
import type {Processor, Record} from '../types/LoggerType';

export type Replacer = (stack: string) => string;

export type StackTraceExtractorOptions = {
  replacer: Replacer
};

export function createStackTraceExtractor({
    replacer = stack => stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '')
}: StackTraceExtractorOptions): Processor {
  return (records: Record[]) => records.map(record => ({
    ...record,
    messages: record.messages.map(message => {
      if (message instanceof Error) {
        return replacer(message.stack);
      }
      return message;
    })
  }));
}
