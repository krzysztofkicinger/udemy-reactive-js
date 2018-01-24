'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * OPERATOR BUFFERCOUNT:
 *  - takes X elements and emits them as an array
 *  - as array
 */
// Rx.Observable.range(1, 100)
//     .bufferCount(50)
//     .subscribe(createSubscriber('bufferCount'));

/**
 * OPERATOR BUFFERTIME:
 *  - emits all items that was pushes in X period of time
 *  - as array
 */
// Rx.Observable.interval(500)
//     .bufferTime(2000)
//     .subscribe(createSubscriber('bufferTime'));

/**
 * OPERATOR BUFFER:
 *  - takes an observable
 *  - every time an observable produces an event the buffer will be flushed
 */
// Rx.Observable.interval(500)
//     .buffer(Rx.Observable.interval(2000))
//     .subscribe(createSubscriber('buffer'));

// const stopSubject$ = new Rx.Subject();
// Rx.Observable.interval(500)
//     .buffer(stopSubject$)
//     .subscribe(createSubscriber('buffer-subject'));
//
// setTimeout(() => {
//     stopSubject$.next();
// }, 3000);

/**
 * OPERATOR TOARRAY:
 *  - merges all items that happened before completion of the observable into an array
 */
_Rx2.default.Observable.range(1, 10)
// .merge(Rx.Observable.never())
.toArray().subscribe((0, _util.createSubscriber)('range'));

/**
 * Rx.Observable.never() - does not produces the complete event! (not an infinite loop)
 */