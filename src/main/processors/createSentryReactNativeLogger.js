import type {Processor} from '../types/ProcessorType';
import type {SentryAdapter} from './createSentryLogger';
import {createSentryLogger} from './createSentryLogger';
import {Sentry} from 'react-native-sentry';

export function createSentryReactNativeAdapter(Sentry): SentryAdapter {
  return {
    captureMessage: Sentry.captureMessage,
    captureException: Sentry.captureException
  };
}

export function createSentryReactNativeLogger(): Processor {
  return createSentryLogger(createSentryReactNativeAdapter(Sentry));
}
