import {Processor, Record} from '../types/LoggerType';
import fs from 'fs';
import path from 'path';

export type FileAppenderOptions = {
  filePath: string;
  encoding: string;
  lineBreak: string;
  basedir: string;
};

export function createFileAppender({
  filePath,
  encoding = 'utf8',
  lineBreak = '\n',
  basedir = __dirname
}: FileAppenderOptions = {}): Processor {
  return (records: Record[]) => {
    fs.appendFile(path.resolve(basedir, filePath), records.join(lineBreak) + lineBreak, encoding, error => {
      if (error) {
        console.error(error);
      }
    });
    return records;
  };
}
