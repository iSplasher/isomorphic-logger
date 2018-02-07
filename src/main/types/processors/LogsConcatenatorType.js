export type LogStringifier = (log: *, charLimit: number) => string;

export type LogsConcatenatorOptions = {
  stringifyLoggedValue: LogStringifier;
};
