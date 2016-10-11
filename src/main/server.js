import {parseLoggerConfig} from './parseLoggerConfig';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createConsoleWriter} from './processors/createConsoleWriter';
import {createFileAppender} from './processors/createFileAppender';
import {createHighlighter} from './processors/createHighlighter';
import {createInspector} from './processors/createInspector';
import {createRollingFileAppender} from './processors/createRollingFileAppender';

export {Logger, Logger as default} from './Logger';
export {parseLoggerConfig} from './parseLoggerConfig';
export {createFileAppender} from './processors/createFileAppender';
export {createHighlighter} from './processors/createHighlighter';
export {createInspector} from './processors/createInspector';
export {createRollingFileAppender} from './processors/createRollingFileAppender';
export {Logger, Logger as default} from './Logger';
export {createArrayAppender} from './processors/createArrayAppender';
export {createStackTraceExtractor} from './processors/createStackTraceExtractor';
export {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
export {createConsoleWriter} from './processors/createConsoleWriter';

export const PROCESSOR_FACTORIES = {
  extractStackTrace: createStackTraceExtractor,
  prependDateAndLevel: createDateAndLevelPrepender,
  writeToConsole: createConsoleWriter,
  appendToFile: createFileAppender,
  highlight: createHighlighter,
  inspect: createInspector,
  appendToRollingFile: createRollingFileAppender,
};
