import {PROCESSOR_FACTORIES as DEFAULT_PROCESSOR_FACTORIES} from '../index';

import {createHighlighter} from './processors/createHighlighter';
import {createFileAppender} from './processors/createFileAppender';
import {createRollingFileAppender} from './processors/createRollingFileAppender';

export {createHighlighter};
export {createFileAppender};
export {createRollingFileAppender};

export const PROCESSOR_FACTORIES = {
  ...DEFAULT_PROCESSOR_FACTORIES,
  highlighter: createHighlighter,
  fileAppender: createFileAppender,
  rollingFileAppender: createRollingFileAppender
};
