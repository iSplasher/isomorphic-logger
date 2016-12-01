import {LogLevel} from '../LogLevel';

export function createConsoleAppender() {
  return records => {
    for (const {level, messages} of records) {
      switch (level) {

        case LogLevel.TRACE:
        case LogLevel.DEBUG:
          if (console.debug) {
            console.debug(...messages);
            return;
          }
          break;

        case LogLevel.WARN:
          if (console.warn) {
            console.warn(...messages);
            return;
          }
          break;

        case LogLevel.ERROR:
          console.error(...messages);
          return;
      }
      console.log(...messages);
    }
    return records;
  }
}
