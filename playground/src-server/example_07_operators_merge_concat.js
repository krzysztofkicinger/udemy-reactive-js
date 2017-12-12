import Rx from 'rxjs/Rx';
import { createSubscriber } from "./lib/util";

/**
 * OPERATOR MERGE - merges another sequences into one sequence
 */
// Rx.Observable.interval(1000)
//     .merge(Rx.Observable.interval(500))
//     .take(10)
//     .subscribe(createSubscriber('merge'));

/**
 * CREATOR MERGE
 */
// Rx.Observable.merge(
//     Rx.Observable.interval(1000),
//     Rx.Observable.interval(500)
// ).take(10).subscribe(createSubscriber('merge-2'));


// const socket = {
//     on$: type => {
//         if(type === 'login') {
//             return Rx.Observable.from({
//                 username: 'johnsmith'
//             });
//         }
//         return Rx.Observable.empty();
//     }
// };
//
// const currentUser$ = Rx.Observable.merge(
//     socket.on$('login').map(user => console.log(`Logged user ${user}`)),
//     socket.on$('logout').map(() => null)
// ).subscribe(createSubscriber('merge-users'));

/**
 * OPERATOR CONCAT - concats two observables into single one
 *  - all but last must be finite Observables
 */
// Rx.Observable.range(1, 10)
//     .concat(Rx.Observable.range(1, 5))
//     .subscribe(createSubscriber('concat'));
//
//
// Rx.Observable.interval(1000)
//     .take(5)
//     .concat(Rx.Observable.range(1, 5))
//     .subscribe(createSubscriber('concat-with-take'));

/**
 * CREATOR CONCAT - concats two observables into single one
 */
Rx.Observable.concat(
    Rx.Observable.range(1, 5),
    Rx.Observable.range(10, 5)
).subscribe(createSubscriber('concat-creator'));