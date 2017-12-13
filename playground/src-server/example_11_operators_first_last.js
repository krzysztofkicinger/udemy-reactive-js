import Rx from 'rxjs/Rx';
import {createSubscriber} from "./lib/util";

const simple$ = new Rx.Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
});

/**
 * OPERATOR FIRST:
 *  - takes first element and then passes the complete event
 *  - if no elements in observable and observable is completed then EmptyError happens
 */
// simple$.first()
//     .subscribe(createSubscriber('first'));

/**
 * OPERATOR LAST:
 *  - takes last element and then passes the complete event
 *  - if no elements in observable and observable is completed then EmptyError happens
 */
// simple$.last()
//     .subscribe(createSubscriber('last'));

/**
 * OPERATOR SINGLE:
 *  - expects just single element in base Observable
 *  - 0 elements - EmptyError
 *  - 2..* elements - error event passed, Sequence contains more than one element
 */
// simple$.single()
//     .subscribe(createSubscriber('single'));

/**
 * OPERATOR TAKE:
 *  - takes X elements and then completes
 *  - if waits for more elements and complete happens then it also completes
 */
// simple$.take(6)
//     .subscribe(createSubscriber('take'));

/**
 * OPERATOR SKIP:
 *  - skips first X elements
 *  - completes when base method completes
 *  - if waits for more elements and complete happens then it also completes
 */
// simple$.skip(4)
//     .subscribe(createSubscriber('skip'));

// simple$.skip(1)
//     .take(2)
//     .subscribe(createSubscriber('skip-with-take'));

/**
 * OPERATOR SKIPWHILE
 *  - takes predicate as argument
 *  - skips element if predicate is true
 *
 * OPERATOR TAKEWHILE:
 *  - takes predicate as argument
 *  - takes element if predicate is true
 */
// Rx.Observable.interval(500)
//     .skipWhile(i => i < 4)
//     .takeWhile(i => i < 10)
//     .subscribe(createSubscriber('skipWhile'));

/**
 * OPERATOR SKIPUNTIL:
 *  - takes an observable as an argument
 *  - skips elements until observable produces a value
 *
 * OPERATOR TAKEUNTIL:
 *  - takes an observable as an argument
 *  - takes elements until observable produces a value
 */
Rx.Observable.interval(500)
    .skipUntil(Rx.Observable.timer(1000))
    .takeUntil(Rx.Observable.timer(3000))
    .subscribe(createSubscriber('skipUntil'));