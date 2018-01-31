import {createAggregator} from './processors/createAggregator';
import {createConsoleAppender} from './processors/createConsoleAppender';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createHighlighter} from './processors/createHighlighter';
import {createInspector} from './processors/createInspector';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createThrottle} from './processors/createThrottle';
import {createErrorWrapper} from './processors/createErrorWrapper';
import {createLogsConcatenator} from './processors/createLogsConcatenator';
import {createSentryLogger} from './processors/createSentryLogger';

export {Logger, Logger as default} from './Logger';
export {LogLevel} from './LogLevel';
export {parseLoggerConfig} from './parseLoggerConfig';
export {createAggregator};
export {createConsoleAppender};
export {createDateAndLevelPrepender};
export {createHighlighter};
export {createInspector};
export {createStackTraceExtractor};
export {createThrottle};
export {createErrorWrapper};
export {createLogsConcatenator};
export {createSentryLogger};

export const PROCESSOR_FACTORIES = {
  logger: (...args) => new Logger(...args),
  aggregator: createAggregator,
  consoleAppender: createConsoleAppender,
  dateAndLevelPrepender: createDateAndLevelPrepender,
  highlighter: createHighlighter,
  inspector: createInspector,
  stackTraceExtractor: createStackTraceExtractor,
  throttler: createThrottle,
  errorWrapper: createErrorWrapper,
  logsConcatenator: createLogsConcatenator,
  sentryLogger: createSentryLogger
};
