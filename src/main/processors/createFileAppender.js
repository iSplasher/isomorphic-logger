import fs from 'fs';

export function createFileAppender(path, {
  bufferSize = 100,
  timeout = 2000,
  encoding = 'utf8',
  lineBreak = '\n'
} = {}) {

  const buffer = [];
  let lastAppendTime = 0;
  let timeoutId;

  return ({level, messages}) => {
    buffer.push(messages.join(' '));
    clearTimeout(timeoutId);

    if (buffer.length >= bufferSize || Date.now() - lastAppendTime > timeout) {
      appendToFile();
    } else {
      timeoutId = setTimeout(appendToFile, timeout);
    }

    return {level, messages};
  };

  function appendToFile() {
    lastAppendTime = Date.now();
    if (buffer.length) {
      fs.appendFile(path, buffer.join(lineBreak) + lineBreak, encoding, error => {
        if (error) {
          console.error(error);
        }
      });
      buffer.length = 0;
    }
  }
}
