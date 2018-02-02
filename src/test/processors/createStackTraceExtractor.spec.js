import {createStackTraceExtractor} from '../../main/processors/createStackTraceExtractor';

describe(`createStackTraceExtractor`, () => {
  it(`invokes replacer function if a message is an instance of Error class`, () => {
    const replacer = jest.fn();
    const stackTraceExtractor = createStackTraceExtractor({replacer});
    stackTraceExtractor([{messages: [new Error]}]);
    expect(replacer.mock.calls.length).toBe(1);
  });

  it(`replaces Error with string and passes Error.stack to a replacer`, () => {
    const approver = jest.fn();
    const replacer = (stack) => {
      if (typeof stack === 'string') {
        approver();
      }
      return 'foo stack';
    };
    const stackTraceExtractor = createStackTraceExtractor({replacer});
    const records = stackTraceExtractor([{messages: [new Error]}]);
    const [error] = records[0].messages;
    expect(approver.mock.calls.length).toBe(1);
    expect(error).toBe('foo stack');
  });
});
