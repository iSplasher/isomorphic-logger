import type {Processor, Record} from '../types/ProcessorType';
import type {ThrottlerOptions} from '../types/processors/ThrottlerType';
import {createAggregator} from "./createAggregator";

export function createThrottle({
  delay = 1000,
  length = 1000,
  leading = true
}: ThrottlerOptions = {}): Processor {
  let timeout;

  return createAggregator({
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
