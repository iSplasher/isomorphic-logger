import type {Processor} from '../types/LoggerType';
import type {FileAppenderOptions} from './___createFileAppender.disabled';
import fs from 'fs';
import {createFileAppender} from './___createFileAppender.disabled';

export function createRollingFileAppender(path: string, {
  maxFileSize = 102400,
  ...fileAppenderOptions
}: FileAppenderOptions = {}): Processor {
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

  return records => {
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
    return fileAppender(records);
  }
}

function createFileName(path, index) {
  return path + '.' + index;
}
