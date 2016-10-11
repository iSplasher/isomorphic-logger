import fs from 'fs';
import {createFileAppender} from './createFileAppender';

export function createRollingFileAppender(path, {
  maxFileSize = 102400,
  ...fileAppenderOptions
} = {}) {
  const fileAppender = createFileAppender(path, fileAppenderOptions);

  let index = 1;
  while (true) {
    try {
      fs.statSync(createFileName(path, index));
    } catch (error) {
      break;
    }
    index++;
  }

  return function({level, messages}) {
    fs.stat(path, (error, stats) => {
      if (error) {
        return;
      }
      if (stats.size >= maxFileSize) {
        try {
          fs.renameSync(path, createFileName(path, index));
          index++;
        } catch(error) {
          // Prevent death if rename failed.
        }
      }
    });

    return fileAppender({level, messages});
  }
}

function createFileName(path, index) {
  return path + '.' + index;
}
