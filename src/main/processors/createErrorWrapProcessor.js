import type {Processor, Record} from '../types/ProcessorType';
import StackTrace from 'stacktrace-js';
import {LogLevel} from '../LogLevel';

const LOGGER_STACK_FRAME_COUNT = 10;

export function createErrorWrapProcessor({
  trimHeadFrames = 0,
  loggerStackFrameCount = LOGGER_STACK_FRAME_COUNT,
  testMessage = defaultTestMessage,
  createStackTrace = defaultCreateStackTrace
} = {}): Processor {
  return (records: Record[]) => records.map(({level, messages, ...props}) => {
    messages = [...messages];
    for (let i = 0; i < messages.length; ++i) {
      if (messages[i] instanceof Error || !testMessage(messages[i], level, i)) {
        continue;
      }
      const error = new Error(messages[i]);
      const stackFrames = StackTrace.getSync().slice(trimHeadFrames + loggerStackFrameCount);
      error.stack = createStackTrace(error.name, error.message, stackFrames);
      messages[i] = error;
    }
    return {level, messages, ...props};
  });
}

export function defaultTestMessage(message: *, level: LogLevel, i: number): boolean {
  return level >= LogLevel.ERROR && i === 0;
}

export function defaultCreateStackTrace(errorType: string, errorMessage: string, stackFrames: string[]): string {
  const callStack = [];
  for (const {fileName, lineNumber, columnNumber, functionName} of stackFrames) {
    const path = `${fileName}:${lineNumber}:${columnNumber}`;
    callStack.push(functionName ? `at ${functionName} (${path})` : `at ${path}`);
  }
  return `${errorType}: ${errorMessage}\n${callStack.join('\n')}`;
}
