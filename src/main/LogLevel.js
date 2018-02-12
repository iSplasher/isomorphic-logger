export class LogLevel {

  static TRACE = new LogLevel(0);
  static DEBUG = new LogLevel(100);
  static INFO = new LogLevel(200);
  static WARN = new LogLevel(300);
  static ERROR = new LogLevel(400);
  static OFF = new LogLevel(Number.MAX_VALUE);

  value: number;

  static valueOf(name: string) {
    return LogLevel[name];
  }

  constructor(value: LogLevel | number) {
    if (value instanceof LogLevel) {
      return value;
    }
    this.value = value;
  }

  valueOf() {
    return this.value;
  }
}
