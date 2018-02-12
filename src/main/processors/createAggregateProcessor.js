import type {Processor, Record} from '../types/ProcessorType';

export type AggregatorPredicate = (records: Record[], dispatch: ?Function) => boolean;

export type AggregatorOptions = {
  predicate: AggregatorPredicate;
};

export function createAggregateProcessor({predicate}: AggregatorOptions): Processor {
  let resolve;
  let promise;
  let cache = [];

  function dispatch() {
    if (cache.length) {
      resolve(cache);
      resolve = null;
      promise = null;
      cache = [];
    }
  }

  function tryDispatch() {
    if (predicate(cache, dispatch)) {
      dispatch();
    }
  }

  return records => {
    cache.push(...records);

    if (resolve) {
      const _promise = promise;
      tryDispatch();
      return _promise;
    } else {
      if (!promise) {
        promise = new Promise(_resolve => {
          resolve = _resolve;
          tryDispatch();
        });
      }
      return promise;
    }
  };
}
