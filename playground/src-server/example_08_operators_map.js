import Rx from 'rxjs/Rx';
import {createSubscriber} from "./lib/util";

/**
 * OPERATOR MAP:
 *  - projection operation that performs a function on each item
 *  - counterpart of SQL's select query
 */
// Rx.Observable.interval(1000)
//     .take(3)
//     .map(a => Math.pow(a, 2))
//     .subscribe(createSubscriber('map'));


/**
 * OPERATOR MERGEMAP:
 *  - previously flatMap()
 *  - counterpart of SQL's select many
 *  - performs a projection that returns another thing that we process (for example an array)
 *  - mergeMap = map + emerge
 */
// function arrayMap(array, projection) {
//     const resultArray = [];
//     for (let item of array) {
//         const projected = projection(item);
//         resultArray.push(projected);
//     }
//     return resultArray;
// }
//
// function arrayMapFunctional(array, projection) {
//     return array.map(projection);
// }
//
// function arrayMergeMap(array, projection) {
//     const resultArray = [];
//     for (let item of array) {
//         const projectedArray = projection(item);
//         for (let projected of projectedArray) {
//             resultArray.push(projected);
//         }
//     }
//     return resultArray;
// }
//
// console.log(arrayMap([1, 2, 3], a => Math.pow(a, 2)));
// console.log(arrayMapFunctional([1, 2, 3], a => Math.pow(a, 2)));
// console.log(arrayMergeMap([1, 2, 3], a => [Math.pow(a, 2)]));

const albums = [
    {
        title: 'Album 1', tracks: [
            {id: 1, title: 'Track 1.1'},
            {id: 2, title: 'Track 1.2'}
        ]
    },
    {
        title: 'Album 2', tracks: [
            {id: 1, title: 'Track 2.1'},
            {id: 2, title: 'Track 2.2'}
        ]
    }
];

// console.log(arrayMergeMap(albums, album => album.tracks));

// Rx.Observable.range(1, 10)
//     .mergeMap(i =>
//         Rx.Observable.timer(i * 1000)
//             .map(() => `${i} seconds`)
//     )
//     .subscribe(createSubscriber('mergeMap'));

/**
 * OPERATOR MERGEMAP WITH PROMISE
 */
// function getTracks() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve([
//             {id: 1, title: 'Track 1.1'},
//             {id: 2, title: 'Track 1.2'},
//             {id: 3, title: 'Track 1.3'}
//         ]), 2000)
//     })
// }
//
// Rx.Observable.fromPromise(getTracks())
//     .mergeMap(tracks => Rx.Observable.from(tracks))
//     .map(track => `${track.id} - ${track.title}`)
//     .subscribe(createSubscriber('mergeMap-promise'));

/**
 * OPERATOR MERGEMAP WITH PROMISE
 */
// function query(value) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve('THIS IS A VALUE'), 1000)
//     })
// }
//
// Rx.Observable.of('my query')
//     .do(value => console.log(`Value: ${value}`))
//     // .mergeMap(value => Rx.Observable.fromPromise(query(value)))
//     .mergeMap(value => query(value))
//     .do(value => console.log(`After querying value: ${value}`))
//     .subscribe(createSubscriber('mergeMap-query'));

/**
 * OPERATOR SWITCHMAP:
 *  - projection operation is the same as in the mergeMap
 *  - performs this operation for LAST ITEM ONLY
 */
Rx.Observable.of([
        {id: 1, title: 'Track 1.1'},
        {id: 2, title: 'Track 1.2'},
        {id: 3, title: 'Track 1.3'}
    ], [
        {id: 1, title: 'Track 2.1'},
        {id: 2, title: 'Track 2.2'},
        {id: 3, title: 'Track 2.3'}
    ], [
        {id: 1, title: 'Track 3.1'},
        {id: 2, title: 'Track 3.2'},
        {id: 3, title: 'Track 3.3'}
    ])
    // .mergeMap(tracks => Rx.Observable.from(tracks))
    .switchMap(tracks => Rx.Observable.from(tracks))
    .map(track => `${track.id} -- ${track.title}`)
    .subscribe(createSubscriber('mergeMap-promise'));