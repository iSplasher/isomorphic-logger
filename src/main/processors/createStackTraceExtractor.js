/**
 * Creates log processor that replaces error messages with their stack trace and crops excessive Webpack paths.
 */
export function createStackTraceExtractor({
    replacer = stack => stack.replace(/\/[^(\n]+(target.out|webpack:)(~?\/)+/g, '')
}) {
  return records => {
    records.map(record => ({
      ...record,
      messages: record.messages.map(message => {
        if (message instanceof Error) {
          return replacer(message.stack);
        }
        return message;
      })
    }));
  };
}
