import type {Processor} from '../../types/ProcessorType';
import type {FileAppenderOptions} from '../../types/server/processors/FileAppenderType';
import fs from 'fs';
import {createFileAppendProcessor} from './createFileAppendProcessor';

export function createRollingFileAppendProcessor({
  filePath,
  maxFileSize = 102400,
  ...fileAppenderOptions
}: FileAppenderOptions = {}): Processor {
  const fileAppender = createFileAppendProcessor(filePath, fileAppenderOptions);

  let index = 1;
  while (true) {
    try {
      fs.statSync(createFileName(filePath, index));
    } catch (error) {
      break;
    }
    index++;
  }

  return records => {
    fs.stat(filePath, (error, stats) => {
      if (error) {
        return;
      }
      if (stats.size >= maxFileSize) {
        try {
          fs.renameSync(filePath, createFileName(filePath, index));
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
