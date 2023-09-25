import { parseConfig } from "./config";
import { Logger } from "./logger";
import { createAggregateProcessor } from "./processors/createAggregateProcessor";
import { createConsoleProcessor } from "./processors/createConsoleProcessor";
import { createDateAndLevelPrependProcessor } from "./processors/createDateAndLevelPrependProcessor";
import { createErrorWrapProcessor } from "./processors/createErrorWrapProcessor";
import { createInspectProcessor } from "./processors/createInspectProcessor";
import { createMessageConcatProcessor } from "./processors/createMessageConcatProcessor";
import { createStackTraceTransformProcessor } from "./processors/createStackTraceTransformProcessor";
import { createThrottleProcessor } from "./processors/createThrottleProcessor";

export { createSentryProcessor } from "./processors/createSentryProcessor";

export { LogLevel } from "./loglevel";

export {
  Logger,
  Logger as default,
  parseConfig as parseLoggerConfig,
  createAggregateProcessor,
  createConsoleProcessor,
  createDateAndLevelPrependProcessor,
  createInspectProcessor,
  createStackTraceTransformProcessor,
  createThrottleProcessor,
  createErrorWrapProcessor,
  createMessageConcatProcessor,
};

export const ProcessorFactories = {
  logger: Logger,
  aggregate: createAggregateProcessor,
  console: createConsoleProcessor,
  prependDateAndLevel: createDateAndLevelPrependProcessor,
  inspect: createInspectProcessor,
  extractStackTrace: createStackTraceTransformProcessor,
  throttle: createThrottleProcessor,
  wrapError: createErrorWrapProcessor,
  concatMessages: createMessageConcatProcessor,
};
