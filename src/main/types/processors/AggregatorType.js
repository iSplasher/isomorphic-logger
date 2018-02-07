import type {Record} from '../ProcessorType';

export type AggregatorPredicate = (records: Record[], dispatch: ?Function) => boolean;

export type AggregatorOptions = {
  predicate: AggregatorPredicate;
};
