import type {Processor, Record} from '../types/LoggerType';
import padStart from "lodash/padStart";
import {LogLevel} from '../LogLevel';

// TODO: refactor, use moment?

export function createDateAndLevelPrepender(): Processor {
  return (records: Record[]) => records.map(record => {
    record = {...record, messages: [...record.messages]};
    const date = new Date;

    record.messages.unshift(
        date.getFullYear() + '-' +
        padStart(date.getMonth() + 1, 2, '0') + '-' +
        padStart(date.getDate(), 2, '0') + ' ' +
        padStart(date.getHours(), 2, '0') + ':' +
        padStart(date.getMinutes(), 2, '0') + ':' +
        padStart(date.getSeconds(), 2, '0'),

        level === LogLevel.DEBUG ? 'DEBUG' :
            level === LogLevel.ERROR ? 'ERROR' :
                level === LogLevel.INFO ? 'INFO' :
                    level === LogLevel.TRACE ? 'TRACE' :
                        level === LogLevel.WARN ? 'WARN' :
                            level
    );

    return record;
  });
}
