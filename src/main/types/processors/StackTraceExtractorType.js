export type StringReplacer = (stack: string) => string;

export type StackTraceExtractorOptions = {
  replacer: StringReplacer
};
