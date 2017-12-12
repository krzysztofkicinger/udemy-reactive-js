import Rx from 'rxjs/Rx';
import { createSubscriber } from "./lib/util";

/**
 * OPERATOR DO - processes a value but does not affects it
 */
Rx.Observable.range(1, 10)
    .do(a => console.log(`From do ${a}`))
    .map(a => Math.pow(a, 2))
    .subscribe(createSubscriber('simple-do'));

/**
 * OPERATOR FINALLY - affect side effects when Observable completes
 */
Rx.Observable.range(1, 10)
    .finally(() => console.log(`From finally`))
    .map(a => Math.pow(a, 2))
    .subscribe(createSubscriber('simple-finally'));

/**
 * OPERATOR FILTER - takes a predicate and filters base Observable
 */
Rx.Observable.range(1, 10)
    .filter(a => a < 5)
    .map(a => Math.pow(a, 2))
    .subscribe(createSubscriber('simple-filter'));

/**
 * OPERATOR STARTWITH - adds a first value to the base observable
 */
Rx.Observable.interval(1000)
    .startWith('START')
    .subscribe(createSubscriber('simple-interval'));