import type {Processor, Record} from '../types/ProcessorType';
import {createAggregateProcessor} from './createAggregateProcessor';

export function createThrottleProcessor({
  delay = 1000,
  length = 1000,
  leading = true
} = {}): Processor {
  let timeout;

  return createAggregateProcessor({
    predicate(records: Record[], dispatch) {
      if (records.length < length) {
        // Aggregator did not collect enough records yet.
        if (leading) {
          if (!timeout) {
            timeout = setTimeout(() => {
              timeout = 0;
              dispatch();
            }, delay);
          }
        } else {
          timeout = setTimeout(dispatch, delay);
        }
      } else {
        clearTimeout(timeout);
        dispatch();
      }
    }
  });
}
