import type {Processor, Record} from '../types/ProcessorType';
import moment from 'moment';
import {LogLevel} from '../LogLevel';

export function getLogLevelName(level) {
  return level === LogLevel.DEBUG ? 'DEBUG' :
         level === LogLevel.ERROR ? 'ERROR' :
         level === LogLevel.INFO ? 'INFO' :
         level === LogLevel.TRACE ? 'TRACE' :
         level === LogLevel.WARN ? 'WARN' :
         level;
}
export function createDateAndLevelPrepender({
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
