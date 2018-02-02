import {createDateAndLevelPrepender, getLogLevelName} from '../../main/processors/createDateAndLevelPrepender';
describe(`getLogLevelName`, () => {
  it(`returns human readable name of log level`, () => {
    expect(getLogLevelName(0)).toBe('TRACE');
    expect(getLogLevelName(1)).toBe('DEBUG');
    expect(getLogLevelName(2)).toBe('INFO');
    expect(getLogLevelName(3)).toBe('WARN');
    expect(getLogLevelName(4)).toBe('ERROR');
    expect(getLogLevelName('foo')).toBe('foo');
  });

  it(`prepends level and and current date to record.message`, () => {
    const dateAndLevelPrepender = createDateAndLevelPrepender({dateFormat: 'YYYY'});
    const records = dateAndLevelPrepender([{level: 0, messages: ['foo']}]);
    const [level, date, message] = records[0].messages;
    expect(level).toBe('TRACE');
    expect(date).toBe(new Date().getFullYear().toString());
    expect(message).toBe('foo');
  });
});
