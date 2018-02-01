import {PROCESSOR_FACTORIES} from './index';
import {parseLoggersConfig} from './parseLoggersConfig';

console.debug = console.log;

const loggersConfig = [{
  id: 'globalLogger',
  channels: [
    {
      level: 'DEBUG',
      processors: [
        {type: 'inspector', options: {depth: 10}},
        {type: 'consoleAppender'},
        {type: 'logger', options: {
          channels: [{
            level: 'INFO',
            processors: [
              {type: 'inspector', options: {depth: 10}},
              {type: 'consoleAppender'}
            ]
          }]}
        }
      ]
    },
    {
      level: 'INFO',
      processors: [
        {
          type: 'logger',
          options: {
            level: 'WARN',
            channels: [
              [
                {type: 'inspector', options: {depth: 10}},
                {type: 'consoleAppender'}
              ]
            ]
          }
        }
      ]
    }
  ]
}];

const {globalLogger} = parseLoggersConfig(loggersConfig, PROCESSOR_FACTORIES);
globalLogger.debug(globalLogger);
