import type {LoggerLogLevel} from '../LoggerType';

export type HighlighterOptions = {
  colors: HighlighterColors
};

export type HighlighterColors = {
  [LoggerLogLevel]: string;
};
