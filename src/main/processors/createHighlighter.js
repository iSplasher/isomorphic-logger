import chalk from 'chalk';
import isObjectLike from 'lodash/isObjectLike';
import {Logger} from '../Logger';

const DEFAULT_COLORS = {
  [Logger.ERROR]: 'red',
  [Logger.TRACE]: 'gray',
  [Logger.DEBUG]: 'blue',
  [Logger.WARN]:  'yellow'
};

/**
 * Creates log processor that applies ASCII coloring to messages according to
 * logging level of the provided record. Useful for terminal logging only.
 */
export function createHighlighter(colors = DEFAULT_COLORS) {
  return ({level, messages}) => {

    messages = messages.map(message => {
      if (!isObjectLike(message)) {
        let methods = colors[level];
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
    });

    return {level, messages};
  };
}
