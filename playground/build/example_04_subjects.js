'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  SIMPLE SUBJECT
 */
// const simple$ = new Rx.Subject();
//
// simple$.subscribe(createSubscriber('simple$'));
//
// simple$.next('Hello');
// simple$.next('World');
// simple$.complete();

/**
 *  (1) SUBJECT AS PROXY FOR OBSERVABLE
 *      - Subject works as a Proxy for another observable (interval$)
 *      - For delayed subscription subject will only pass elements from the point in time when Subscriber subscribed to the Subject
 *      - For delayed subscription
 */
// const interval$ = Rx.Observable.interval(1000).take(5);
// const intervalSubject$ = new Rx.Subject();
// interval$.subscribe(intervalSubject$);
//
// intervalSubject$.subscribe(createSubscriber('sub1'));
// intervalSubject$.subscribe(createSubscriber('sub2'));
// intervalSubject$.subscribe(createSubscriber('sub3'));
//
// setTimeout(() => {
//     intervalSubject$.subscribe(createSubscriber('LOOK AT ME THROUGH SUBJECT'));
// }, 2000);
//
// setTimeout(() => {
//     interval$.subscribe(createSubscriber('LOOK AT ME THROUGH OBSERVABLE'));
// }, 2000);

/**
 *  (2) KICKING OF THE WORKFLOW:
 *      - entire workflow can be kicked of in the future by adding new value to the subject
 *      - this notifies all the subscribers
 *      - if you subscribe to the Observable (isLoggedIn$) then previous values are lost! -> Use BEHAVIOR SUBJECT 3
 */
// const currentUser$ = new Rx.Subject();
// const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn);
//
// isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));
//
// currentUser$.next({ isLoggedIn: false });
// setTimeout(() => {
//     currentUser$.next({ isLoggedIn: true, name: 'nelson' });
// }, 2000);
//
// setTimeout(() => {
//     isLoggedIn$.subscribe(createSubscriber('delayed'));
// }, 1000);

/**
 *  (3) BEHAVIOR SUBJECTS:
 *      - Behavior Subject expects to be passed an initial state
 *      - Initial value is passed in the first (next) invocation
 */
var currentUserBehavior$ = new _Rx2.default.BehaviorSubject({ isLoggedIn: false });
var isLoggedInBehavior$ = currentUserBehavior$.map(function (u) {
  return u.isLoggedIn;
});

isLoggedInBehavior$.subscribe((0, _util.createSubscriber)('isLoggedInBehavior'));

currentUserBehavior$.next({ isLoggedIn: false });
setTimeout(function () {
  currentUserBehavior$.next({ isLoggedIn: true, name: 'nelson' });
}, 2000);

setTimeout(function () {
  isLoggedInBehavior$.subscribe((0, _util.createSubscriber)('delayed'));
}, 1000);

/**
 * (4) REPLY SUBJECT:
 *  - takes buffer size as the initial value
 *  - when Subscriber subscribes it receives at most last <buffer_size> elements
 *  - (vs Behavior):
 *      - Behavior always submits the value from the initial state
 *      - Replay would not admit values if we didn't previously buffer up items
 */
var replay$ = new _Rx2.default.ReplaySubject(3);
replay$.next(1);
replay$.next(2);

replay$.subscribe((0, _util.createSubscriber)('one'));
replay$.next(3);
replay$.next(4);
replay$.next(5);
replay$.next(6);
replay$.next(7);

replay$.subscribe((0, _util.createSubscriber)('two'));

/**
 * (5) ASYNC SUBJECT:
 *      - Async Subject will only emit the final item before it's completed
 *      - Async Subject emits only the final value
 *      - It also stores that value so that when you subscribe to it again in the future (even if it is already completed)
 *      - the final value will be admitted
 */
var apiCall$ = new _Rx2.default.AsyncSubject();
apiCall$.next(1);
apiCall$.subscribe((0, _util.createSubscriber)('one'));

apiCall$.next(2);
apiCall$.complete();

setTimeout(function () {
  apiCall$.subscribe((0, _util.createSubscriber)('two'));
}, 2000);