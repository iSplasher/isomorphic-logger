import padStart from "lodash/padStart";
import {Logger} from "../Logger";

export function createDateAndLevelPrepender() {
  return records => records.map(record => {
    record = {...record, messages: [...record.messages]};
    const date = new Date;

    record.messages.unshift(
        date.getFullYear() + '-' +
        padStart(date.getMonth() + 1, 2, '0') + '-' +
        padStart(date.getDate(), 2, '0') + ' ' +
        padStart(date.getHours(), 2, '0') + ':' +
        padStart(date.getMinutes(), 2, '0') + ':' +
        padStart(date.getSeconds(), 2, '0'),

        level == Logger.DEBUG ? 'DEBUG' :
            level == Logger.ERROR ? 'ERROR' :
                level == Logger.INFO ? 'INFO' :
                    level == Logger.TRACE ? 'TRACE' :
                        level == Logger.WARN ? 'WARN' :
                            level
    );

    return record;
  });
}