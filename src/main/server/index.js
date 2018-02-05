export {Logger, Logger as default} from '../Logger';
import {PROCESSOR_FACTORIES as DEFAULT_PROCESSOR_FACTORIES} from '../index';
import {createSentryNodeLogger} from '../processors/createSentryNodeLogger';

export const PROCESSOR_PACTORIES = {
  ...DEFAULT_PROCESSOR_FACTORIES,
  sentryNodeLogger: createSentryNodeLogger
};
