import type {Processor, Record} from '../types/ProcessorType';
import moment from 'moment';
import {LogLevel} from '../LogLevel';

export function getLogLevelName(level) {
  for (const key in LogLevel) {
    if (LogLevel[key] === level) {
      return key;
    }
  }
  return level;
}

export function createDateAndLevelPrependProcessor({
  dateFormat = 'YYYY-MM-DD HH:MM:SS'
} = {}): Processor {
  return (records: Record[]) => records.map(record => {
    record = {...record, messages: [...record.messages]};
    const {messages, level} = record;

    messages.unshift(
        getLogLevelName(level),
        moment().format(dateFormat)
    );

    return record;
  });
}
