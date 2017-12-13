import Rx from 'rxjs/Rx';
import {createSubscriber} from "./lib/util";

// function arrayZip(array1, array2, selector) {
//     const count = Math.min(array1.length, array2.length);
//     const results = [];
//
//     for (let i = 0; i < count; i++) {
//         const combined = selector(array1[i], array2[i]);
//         results.push(combined)
//     }
//
//     return results;
// }
//
// const array1 = [1, 2, 3, 4, 5];
// const array2 = [11, 22, 33, 44, 55];
//
// const results = arrayZip(array1, array2, (left, right) => left * right);
// console.log(results);

/**
 * OPERATOR ZIP:
 *  - combines two Observables by invoking selector operation
 *  - if any of two Observables completes then 'zip' Observable also completes
 */
// Rx.Observable.range(1, 10)
//     .zip(Rx.Observable.interval(500), (left, right) => `Item: ${left}, at ${right}`)
//     .subscribe(createSubscriber('zip'));

/**
 * OPERATOR WITHLATESTFROM:
 *  - emits an item only if source emits an item
 *  - the source item is combined with the last item from the destination
 */
// Rx.Observable.interval(1000)
//     .withLatestFrom(Rx.Observable.interval(500))
//     .take(10)
//     .subscribe(createSubscriber('withLatestFrom'));

/**
 * OPERATOR COMBINELATEST:
 *  - emits an item if source or destination emit an item
 *  - matches two latest items from both observables
 */
// Rx.Observable.interval(1000)
//     .combineLatest(Rx.Observable.interval(500))
//     .take(10)
//     .subscribe(createSubscriber('combineLatest'));
//
// Rx.Observable.interval(1000)
//     .combineLatest(Rx.Observable.interval(500), (left, right) => `Left: ${left}, Right: ${right}`)
//     .take(10)
//     .subscribe(createSubscriber('combineLatest'));

const currentUser$ = new Rx.BehaviorSubject({
    isLoggedIn: false
});

Rx.Observable.interval(1000)
    // .withLatestFrom(currentUser$)
    .combineLatest(currentUser$)
    .do(console.log)
    .filter(([i, user]) => user.isLoggedIn)
    .take(5)
    .subscribe(createSubscriber('withLatestFrom'));

setTimeout(() => {
    currentUser$.next({
        isLoggedIn: true
    })
}, 2500);
