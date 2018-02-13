import {createAggregateProcessor} from '../../main/processors/createAggregateProcessor';

describe(`createAggregateProcessor`, () => {

  it('returns same promise if predicate did not return true', () => {
    const predicate = records => false;
    const aggregate = createAggregateProcessor({predicate});
    expect(aggregate([1])).toBe(aggregate([2]));
  });

  it('processes records that were collected before predicate returned true', async done => {
    const predicate = records => records.length > 1;
    const aggregate = createAggregateProcessor({predicate});

    const promise = aggregate([1]);

    expect(promise).toBe(aggregate([2]));
    expect(promise).not.toBe(aggregate([3]));

    expect(await promise).toEqual([1, 2]);
    done();
  });

  it('flushes cache between processes', async done => {
    const predicate = records => records.length > 1;
    const aggregate = createAggregateProcessor({predicate});

    aggregate([1]);
    aggregate([2]); // Flush should happen after this statement.

    const promise = aggregate([3]);
    aggregate([4]);

    expect(await promise).toEqual([3, 4]);
    done();
  });

  it('predicate can do asynchronous process', async done => {
    const predicate = (records, dispatch) => {
      if (records.length > 1) {
        setTimeout(dispatch, 10);
      }
      // Predicate always returns false, but invokes process asynchronously.
      return false;
    };
    const aggregate = createAggregateProcessor({predicate});

    const promise = aggregate([1]);

    expect(promise).toBe(aggregate([2])); // setTimeout is called after this statement.
    expect(promise).toBe(aggregate([3])); // setTimeout is called after this statement as well.

    // All messages would go to the same promise because they are dispatched asynchronously
    // but added synchronously to buffer.

    expect(await promise).toEqual([1, 2, 3]);
    done();
  });

});
