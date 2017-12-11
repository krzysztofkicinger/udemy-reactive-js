import Rx from 'rxjs/Rx';
import { createSubscriber } from "./lib/util";

/**
 * Pushes new value each 500ms (interval) until 5 pushes (take) are done
 * Then passes complete message
 */
Rx.Observable.interval(500)
    .take(5)
    .subscribe(createSubscriber('interval'));

/**
 * Passed a due time (Date object or relative time in ms)
 * Then passes complete message
 *
 * timer - create a setTimeout behind the scenes
 * timer(1000, 500) - start after one second and repeat each 500ms
 */
Rx.Observable.timer(4000)
    .subscribe(createSubscriber('timer'));

Rx.Observable.timer(1000, 500)
    .take(3)
    .subscribe(createSubscriber('timer-2'));


/**
 * of, from - important in context of sync of workflow
 *
 * of - can take multiple items (varargs)
 * from - takes ArrayLike thing and flats it, expects! iterable thing
 *      - also can take iterable (example of generator function)
 *      - String is iterated by characters
 */
Rx.Observable.of('Hello, World', 42, 'whoa')
    .subscribe(createSubscriber('of'));

Rx.Observable.from([23, 12, 'hey', new Date()])
    .subscribe(createSubscriber('from'));

// function* generate() {
//     yield 1;
//     yield 5;
//     yield 'hey'
// }
//
// Rx.Observable.from(generate())
//     .subscribe(createSubscriber('from-generate'));

Rx.Observable.from('Iterable String')
    .subscribe(createSubscriber('from-string'));

/**
 * ERRORS
 *
 * throw - always throws an error
 * from, of  - passing an error DOES not throw an error, it just takes an Error as next value
 *           - this might be useful
 */
Rx.Observable.throw(new Error('Error'))
    .subscribe(createSubscriber('error'));

Rx.Observable.throw('Simple Message wrapped by Error')
    .subscribe(createSubscriber('error'));

// Rx.Observable.from(new Error('Error'))
//     .subscribe(createSubscriber('error-from'));


/**
 *  empty - useful when we have to return observable with items or without (sth like Optional.empty())
 *        - send only COMPLETE message
 */
Rx.Observable.empty()
    .subscribe(createSubscriber('empty'));

/**
 * defer -  creates an Observable that creates this generator function (like creating our own observable)
 *          and invokes this function every time subscriber subscribes to it
 */
let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
    sideEffect++;
    return Rx.Observable.of(sideEffect);
});

defer$.subscribe(createSubscriber('defer$.one'));
defer$.subscribe(createSubscriber('defer$.two'));
defer$.subscribe(createSubscriber('defer$.three'));

/**
 * empty - does not produce any items but it COMPLETES
 * never - never produces no items and never completes
 */
Rx.Observable.never()
    .subscribe(createSubscriber('never'));

/**
 * range(startNumber, totalCount)
 */
Rx.Observable.range(10, 30)
    .subscribe(createSubscriber('range'));