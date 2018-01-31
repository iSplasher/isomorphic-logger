// @flow

//import {parseLoggerConfig} from './parseLoggerConfig';
import {PROCESSOR_FACTORIES} from './index';
import {ProcessorFactoryMap} from './types/LoggerType';

const loggerConfig = {
  level: 'DEBUG',
  processors: [
    [
      {type: 'aggregate', options: {timeout: 1000}},
      {type: 'console'},
      {type: 'logger', options: {
        level: 'INFO',
        processors: [
          {type: 'logsConcatenator'}
        ]
      }}
    ]
  ]
};

function parseLoggerConfig(loggerConfig: {}, processorFactories: ProcessorFactoryMap) {
  //function createLogger
}

const loggers = parseLoggerConfig(loggerConfig, PROCESSOR_FACTORIES);
