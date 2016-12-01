export function createArrayAppender({array, limit = 100}) {
  return records => {
    array.push(...records);
    array.splice(0, array.length - limit);
    return records;
  };
}
