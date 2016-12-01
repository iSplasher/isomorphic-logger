import objectInspect from "object-inspect";

/**
 * Converts object messages to stringified representation.
 * @param {Number} [depth = 10] Object nesting depth.
 */
export function createInspector({depth = 10}) {
  return records => records.map(record => ({
    ...record,
    messages: record.messages.map(message => {
      if (typeof message == 'object' || typeof message == 'function') {
        return objectInspect(message, {depth});
      }
      return message;
    })
  }))
}
