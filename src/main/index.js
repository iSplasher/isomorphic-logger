import {Logger} from './Logger';
import {parseLoggersConfig} from './parseLoggersConfig';
import {createAggregator} from './processors/createAggregator';
import {createConsoleAppender} from './processors/createConsoleAppender';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createInspector} from './processors/createInspector';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createThrottle} from './processors/createThrottle';
import {createErrorWrapper} from './processors/createErrorWrapper';
import {createLogsConcatenator} from './processors/createLogsConcatenator';

export {Logger, Logger as default};
export {LogLevel} from './LogLevel';
export {parseLoggersConfig};
export {createAggregator};
export {createConsoleAppender};
export {createDateAndLevelPrepender};
export {createInspector};
export {createStackTraceExtractor};
export {createThrottle};
export {createErrorWrapper};
export {createLogsConcatenator};
export {createSentryLogger} from './processors/createSentryLogger';

export const PROCESSOR_FACTORIES = {
  logger: Logger,
  aggregator: createAggregator,
  consoleAppender: createConsoleAppender,
  dateAndLevelPrepender: createDateAndLevelPrepender,
  inspector: createInspector,
  stackTraceExtractor: createStackTraceExtractor,
  throttle: createThrottle,
  errorWrapper: createErrorWrapper,
  logsConcatenator: createLogsConcatenator
};
