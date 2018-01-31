import type {Processor, Record} from '../types/LoggerType';
import {createAggregator} from "./createAggregator";

export type ThrottlerOptions = {
  delay: number;
  length: number;
  leading: boolean;
};

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
