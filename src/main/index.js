import {Logger} from './Logger';
import {parseLoggersConfig} from './parseLoggersConfig';
import {createAggregator} from './processors/createAggregator';
import {createConsoleAppender} from './processors/createConsoleAppender';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createHighlighter} from './processors/createHighlighter';
import {createInspector} from './processors/createInspector';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createThrottle} from './processors/createThrottle';
import {createErrorWrapper} from './processors/createErrorWrapper';
import {createLogsConcatenator} from './processors/createLogsConcatenator';
//import {createSentryWebLogger} from './processors/createSentryWebLogger';
//import {createSentryNodeLogger} from './processors/createSentryNodeLogger';

export {Logger, Logger as default};
export {LogLevel} from './LogLevel';
export {parseLoggersConfig};
export {createAggregator};
export {createConsoleAppender};
export {createDateAndLevelPrepender};
export {createHighlighter};
export {createInspector};
export {createStackTraceExtractor};
export {createThrottle};
export {createErrorWrapper};
export {createLogsConcatenator};
//export {createSentryWebLogger};
//export {createSentryNodeLogger};

export const PROCESSOR_FACTORIES = {
  logger: Logger,
  aggregator: createAggregator,
  consoleAppender: createConsoleAppender,
  dateAndLevelPrepender: createDateAndLevelPrepender,
  highlighter: createHighlighter,
  inspector: createInspector,
  stackTraceExtractor: createStackTraceExtractor,
  throttle: createThrottle,
  errorWrapper: createErrorWrapper,
  logsConcatenator: createLogsConcatenator,
  //sentryWebLogger: createSentryWebLogger,
  //sentryNodeLogger: createSentryNodeLogger
};
