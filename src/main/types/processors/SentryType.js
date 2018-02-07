export type SentryAdapter = {
  setConfig(sentryConfig: {}): *;
  install(installerConfig: {}): *;
  captureMessage(message: *, options: *): *;
  captureException(message: *, options: *): *;
};
