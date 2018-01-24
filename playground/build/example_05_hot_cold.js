'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CHANGING COLD INTO HOT - EXAMPLE 1
 */
// const interval$ = Rx.Observable.interval(1000)
//     .take(10)
//     .publish();
//
// interval$.connect();
//
// setTimeout(() => {
//     interval$.subscribe(createSubscriber('one'))
// }, 1200);
//
// setTimeout(() => {
//     interval$.subscribe(createSubscriber('two'))
// }, 3200);

/**
 * CHANGING COLD INTO HOT - EXAMPLE 2
 */
// const socket = {
//     on: message => {}
// };
//
// const chatMessages$ = new Rx.Observable(observable => {
//     console.log('Subscribed');
//     socket.on("chat:message", message => observer.next(message))
// }).publish();
//
// chatMessages$.connect();
//
// chatMessages$.subscribe(createSubscriber('chat-message.one'));
// chatMessages$.subscribe(createSubscriber('chat-message.two'));

/**
 * CHANGING COLD INTO HOT - EXAMPLE 3
 *      - publishLast() - creates AsyncSubject
 *      - sends last published values
 *      - must invoke complete to start pushing values
//  */
// const simple$ = new Rx.Observable(observer => {
//     observer.next('one');
//     observer.next('two');
//     observer.complete();
// });
//
// const published$ = simple$.publishLast();
//
// published$.subscribe(createSubscriber('one'));
//
// published$.connect();
//
// published$.subscribe(createSubscriber('two'));

/**
 * CHANGING COLD INTO HOT - EXAMPLE 4
 *      - publishReplay() - creates ReplaySubject
 */
// const simple$ = new Rx.Observable(observer => {
//     observer.next('one');
//     observer.next('two');
//     observer.next('three');
//     // observer.complete();
//
//     return () => console.log('Disposed');
// });
//
// const published$ = simple$.publishReplay(2);
//
// published$.subscribe(createSubscriber('one'));
//
// const connectedPublished$ = published$.connect();
//
// published$.subscribe(createSubscriber('two'));
//
/**
 * HOW TO DISPOSE A CONNECTED OBSERVABLE
 */
// connectedPublished$.unsubscribe();

/**
 * REFERENCE COUNT - EXAMPLE 5
 *      - refCount() method invokes implicitly connect() method on the first subscription
 *      - refCount() disconnects implicitly when last Subscription unsubscribers
 *      - share() = publish().refCount()
 */
var simple$ = new _Rx2.default.Observable(function (observer) {
  observer.next('one');
  observer.next('two');
  observer.next('three');

  return function () {
    return console.log('Disposed');
  };
});

// const published$ = simple$.publish().refCount();
// const published$ = simple$.publishReplay(2).refCount();
var published$ = simple$.share();

var sub1$ = published$.subscribe((0, _util.createSubscriber)('one'));
var sub2$ = published$.subscribe((0, _util.createSubscriber)('two'));

sub1$.unsubscribe();
sub2$.unsubscribe();