import fs from 'fs';
import path from 'path';

export function createFileAppender({
  filePath,
  encoding = 'utf8',
  lineBreak = '\n',
  basedir = __dirname
} = {}) {
  return records => {
    fs.appendFile(path.resolve(basedir, filePath), records.join(lineBreak) + lineBreak, encoding, error => {
      if (error) {
        console.error(error);
      }
    });
  };
}
