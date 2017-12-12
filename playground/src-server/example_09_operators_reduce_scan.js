import Rx from 'rxjs/Rx';
import {createSubscriber} from "./lib/util";

// function arrayReduce(array, accumulator, startValue) {
//     let value = startValue;
//     for(let item of array) {
//         value = accumulator(value, item);
//     }
//     return value;
// }
//
// const values = [342, 432, 23, 1, 34];
// console.log(arrayReduce(values, (acc, i) => acc + i, 0));
//
// // const max = arrayReduce(values, (acc, i) => acc > i ? acc : i, -1);
// const max = arrayReduce(values, Math.max, -1);
// console.log(max);

/**
 * OPERATOR REDUCE:
 *  - reduces values in particular stream
 */
Rx.Observable.range(1, 10)
    .merge(Rx.Observable.never())
    .reduce((acc, i) => acc + i)
    .subscribe(createSubscriber('reduce'));

/**
 * OPERATOR SCAN:
 *  - nearly the same as reduce but returns each accumulated (step) value
 *  - scan is good at pre-processing values
 */
Rx.Observable.range(1, 10)
    .merge(Rx.Observable.never())
    .scan((acc, i) => acc + i)
    .subscribe(createSubscriber('scan'));

Rx.Observable.range(1, 10)
    .map(i => i * i)
    .scan(([last, _], current) => [current, last], [])
    .subscribe(createSubscriber('scan'));

/**
 * DECONSTRUCTION STRUCTURE
 *
 *      ([last, _], current) => [current, last]
 *
 *  Array deconstruction: [ first, _ ] - gets access to first parameter
 *
 */
function scanLast(acc, value) {
    const last = acc[0];
    return [value, last]
}