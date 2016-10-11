/**
 * Creates log processor that converts all error objects in record messages
 * into their stack trace and crops excessive Webpack paths.
 */
export function extractStackTrace({level, messages}) {
  messages = messages.map(message => {
    if (message instanceof Error) {
      return message.stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '');
    }
    return message;
  });

  return {level, messages};
}
