import type {Processor, Record} from '../../types/ProcessorType';
import type {FileAppenderOptions} from '../../types/server/processors/FileAppenderType';
import fs from 'fs';
import path from 'path';

export function createFileAppendProcessor({
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
