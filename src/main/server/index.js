import {PROCESSOR_FACTORIES as DEFAULT_PROCESSOR_FACTORIES} from '../index';
import {createSentryNodeLogger} from '../processors/createSentryNodeLogger';

export {Logger, Logger as default} from '../Logger';
export {LogLevel} from '../LogLevel';
export {parseLoggersConfig} from '../parseLoggersConfig';
export {createAggregator} from '../processors/createAggregator';
export {createConsoleAppender} from '../processors/createConsoleAppender';
export {createDateAndLevelPrepender} from '../processors/createDateAndLevelPrepender';
export {createHighlighter} from '../processors/createHighlighter';
export {createInspector} from '../processors/createInspector';
export {createStackTraceExtractor} from '../processors/createStackTraceExtractor';
export {createThrottle} from '../processors/createThrottle';
export {createErrorWrapper} from '../processors/createErrorWrapper';
export {createLogsConcatenator} from '../processors/createLogsConcatenator';
export {createSentryWebLogger} from '../processors/createSentryWebLogger';

export const PROCESSOR_PACTORIES = {
  ...DEFAULT_PROCESSOR_FACTORIES,
  sentryNodeLogger: createSentryNodeLogger
};
