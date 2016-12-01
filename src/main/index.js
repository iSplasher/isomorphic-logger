import {createAggregator} from './processors/createAggregator';
import {createArrayAppender} from './processors/createArrayAppender';
import {createConsoleAppender} from './processors/createConsoleAppender';
import {createDateAndLevelPrepender} from './processors/createDateAndLevelPrepender';
import {createFileAppender} from './processors/createFileAppender';
import {createHighlighter} from './processors/createHighlighter';
import {createInspector} from './processors/createInspector';
import {createRollingFileAppender} from './processors/createRollingFileAppender';
import {createStackTraceExtractor} from './processors/createStackTraceExtractor';
import {createThrottle} from './processors/createThrottle';

export {Logger, Logger as default} from './Logger';
export {createAggregator};
export {createArrayAppender};
export {createConsoleAppender};
export {createDateAndLevelPrepender};
export {createFileAppender};
export {createHighlighter};
export {createInspector};
export {createRollingFileAppender};
export {createStackTraceExtractor};
export {createThrottle};

export const PROCESSOR_FACTORIES = {
  aggregator: createAggregator,
  arrayAppender: createArrayAppender,
  consoleAppender: createConsoleAppender,
  dateAndLevelPrepender: createDateAndLevelPrepender,
  fileAppender: createFileAppender,
  highlighter: createHighlighter,
  inspector: createInspector,
  tollingFileAppender: createRollingFileAppender,
  stackTraceExtractor: createStackTraceExtractor,
  throttle: createThrottle
};
