/**
 * Creates log processor that replaces error messages with their stack trace and crops excessive Webpack paths.
 */
import type {Processor, Record} from '../types/ProcessorType';

function webpackStackCleaner(stack) {
   return stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '')
}

export function createStackTraceTransformProcessor({
    replacer = webpackStackCleaner
} = {}): Processor {
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
