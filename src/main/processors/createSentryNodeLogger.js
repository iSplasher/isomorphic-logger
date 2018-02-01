import type {Processor} from '../types/ProcessorType';
import type {SentryAdapter} from './createSentryLogger';
import {createSentryLogger} from './createSentryLogger';
import Raven from 'raven';

export function createSentryNodeAdapter(Sentry): SentryAdapter {
  return {
    captureMessage: Sentry.captureMessage,
    captureException: Sentry.captureException
  };
}

export function createSentryNodeLogger(): Processor {
  return createSentryLogger(createSentryNodeAdapter(Raven));
}
