/**
 * Creates log processor that replaces error messages with their stack trace and crops excessive Webpack paths.
 */
import type {Processor, Record} from '../types/ProcessorType';
import type {StackTraceExtractorOptions} from '../types/processors/StackTraceExtractorType';

function webpackStackCleaner(stack) {
   return stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '')
}

export function createStackTraceExtractor({
    replacer = webpackStackCleaner
}: StackTraceExtractorOptions = {}): Processor {
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
