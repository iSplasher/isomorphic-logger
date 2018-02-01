import type {Processor} from '../types/ProcessorType';
import type {SentryAdapter} from './createSentryLogger';
import {createSentryLogger} from './createSentryLogger';
import Raven from 'raven-js';

export function createSentryWebAdapter(Sentry): SentryAdapter {
  return {
    captureMessage: Sentry.captureMessage,
    captureException: Sentry.captureException
  };
}

export function createSentryWebLogger(): Processor {
  return createSentryLogger(createSentryWebAdapter(Raven));
}
