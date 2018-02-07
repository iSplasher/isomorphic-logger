import type {LoggerLogLevel} from '../LoggerType';

export type MessageTester = (message: *, level: LoggerLogLevel, i: number) => boolean;

export type StackTraceCreator = (errorType: string, errorMessage: string, stackFrames: StackFrame[]) => string;

export type StackFrame = {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  functionName: string;
};

export type ErrorWrapperOptions = {
  trimHeadFrames: number;
  testMessage: MessageTester;
  createStackTrace: StackTraceCreator;
};
