/**
 * Creates log processor that pushes received records into an array.
 *
 * @param {Array} array
 */
export function createArrayAppender(array) {
  if (Array.isArray(array)) {
    return record => {
      array.push(record);
      return record;
    };
  }
  throw new Error('Expected an array to push records');
}
