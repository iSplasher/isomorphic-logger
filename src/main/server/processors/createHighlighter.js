/**
 * Creates log processor that applies ASCII coloring to messages according to
 * logging level of the provided record. Useful for terminal logging only.
 */
import type {Processor, Record} from '../../types/ProcessorType';
import type {HighlighterOptions} from '../../types/processors/HighlighterType';
import chalk from "chalk";
import isObjectLike from "lodash/isObjectLike";
import {LogLevel} from '../../LogLevel';

const DEFAULT_COLORS = {
  [LogLevel.ERROR]: 'red',
  [LogLevel.TRACE]: 'gray',
  [LogLevel.DEBUG]: 'blue',
  [LogLevel.WARN]: 'yellow'
};

export function createHighlighter({colors = DEFAULT_COLORS}: HighlighterOptions = {}): Processor {
  return (records: Record[]) => records.map(record => ({
    ...record,
    messages: record.messages.map(message => {
      if (!isObjectLike(message)) {
        let methods = colors[record.level];
        if (methods) {
          if (!Array.isArray(methods)) {
            methods = [methods];
          }
          for (const method of methods) {
            message = chalk[method](message);
          }
        }
      }
      return message;
    })
  }));
}
