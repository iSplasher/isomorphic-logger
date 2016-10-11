import util from 'util';
import isObjectLike from 'lodash/isObjectLike';

/**
 * Creates log processor that converts objects into string representation.
 * Should be used in node environment only.
 */
export function createInspector(options) {
  return function ({level, messages}) {

    messages = messages.map(message => {
      if (isObjectLike(message)) {
        return util.inspect(message, options);
      }
      return message;
    });

    return {level, messages};
  };
}
