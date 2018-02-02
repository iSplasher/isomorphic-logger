/**
 * Creates log processor that replaces error messages with their stack trace and crops excessive Webpack paths.
 */
import type {Processor, Record} from '../types/ProcessorType';

export type StringReplacer = (stack: string) => string;

export type StackTraceExtractorOptions = {
  replacer: StringReplacer
};

function webpackStackCleaner(stack) {
   return stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '')
}

export function createStackTraceExtractor({
    replacer = webpackStackCleaner
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
