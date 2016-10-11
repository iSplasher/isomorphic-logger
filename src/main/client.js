import {parseLoggerConfig} from './parseLoggerConfig';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createConsoleWriter} from './processors/createConsoleWriter';

export {Logger, Logger as default} from './Logger';
export {parseLoggerConfig} from './parseLoggerConfig';
export {createArrayAppender} from './processors/createArrayAppender';
export {createStackTraceExtractor} from './processors/createStackTraceExtractor';
export {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
export {createConsoleWriter} from './processors/createConsoleWriter';

export const PROCESSOR_FACTORIES = {
  extractStackTrace: createStackTraceExtractor,
  prependDateAndLevel: createDateAndLevelPrepender,
  writeToConsole: createConsoleWriter
};
