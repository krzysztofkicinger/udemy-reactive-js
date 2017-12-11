import Rx from 'rxjs/Rx';
import fs from 'fs';
import { createSubscriber } from "./lib/util";

/**
 * fromEvent - creates an Observable that checks if specific event has happened
 *      - it does not know what event (object) is passed so it must detect the event pattern
 *      - it binds an event object that support particular event
 *      - behind the scenes uses: on, addEventListener etc. methods
 */
// Rx.Observable.fromEvent();


// fs.readdir('./src-server', (err, items) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(items);
//     }
// });

/**
 * BINDING NODE CALLBACKS
 *  - bindNodeCallback - returns a function
 *  - What we have to do?
 *      - Convert function that takes callback to 'Observable' function
 *      - Invoke this function
 *
 * - mergeMap(files => Rx.Observable.from(files))
 *      - takes an array
 *      - returns Observable that flats an array and returns Observable of each item
 */
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
console.log(`Type - bindNodeCallback: ${typeof readdir$}`);

readdir$('./src-server')
    .mergeMap(files => Rx.Observable.from(files))
    .map(file => `Manipulated ${file}`)
    .subscribe(createSubscriber('readdir'));

/**
 * PROMISES:
 *  - fromPromise(promise) - returns Observable from Promise
 */
function getItem() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Hello'), 1000);
    })
}

Rx.Observable.fromPromise(getItem())
    .subscribe(createSubscriber('promise'));