'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pushes new value each 500ms (interval) until 5 pushes (take) are done
 * Then passes complete message
 */
_Rx2.default.Observable.interval(500).take(5).subscribe((0, _util.createSubscriber)('interval'));

/**
 * Passed a due time (Date object or relative time in ms)
 * Then passes complete message
 *
 * timer - create a setTimeout behind the scenes
 * timer(1000, 500) - start after one second and repeat each 500ms
 */
_Rx2.default.Observable.timer(4000).subscribe((0, _util.createSubscriber)('timer'));

_Rx2.default.Observable.timer(1000, 500).take(3).subscribe((0, _util.createSubscriber)('timer-2'));

/**
 * of, from - important in context of sync of workflow
 *
 * of - can take multiple items (varargs)
 * from - takes ArrayLike thing and flats it, expects! iterable thing
 *      - also can take iterable (example of generator function)
 *      - String is iterated by characters
 */
_Rx2.default.Observable.of('Hello, World', 42, 'whoa').subscribe((0, _util.createSubscriber)('of'));

_Rx2.default.Observable.from([23, 12, 'hey', new Date()]).subscribe((0, _util.createSubscriber)('from'));

// function* generate() {
//     yield 1;
//     yield 5;
//     yield 'hey'
// }
//
// Rx.Observable.from(generate())
//     .subscribe(createSubscriber('from-generate'));

_Rx2.default.Observable.from('Iterable String').subscribe((0, _util.createSubscriber)('from-string'));

/**
 * ERRORS
 *
 * throw - always throws an error
 * from, of  - passing an error DOES not throw an error, it just takes an Error as next value
 *           - this might be useful
 */
_Rx2.default.Observable.throw(new Error('Error')).subscribe((0, _util.createSubscriber)('error'));

_Rx2.default.Observable.throw('Simple Message wrapped by Error').subscribe((0, _util.createSubscriber)('error'));

// Rx.Observable.from(new Error('Error'))
//     .subscribe(createSubscriber('error-from'));


/**
 *  empty - useful when we have to return observable with items or without (sth like Optional.empty())
 *        - send only COMPLETE message
 */
_Rx2.default.Observable.empty().subscribe((0, _util.createSubscriber)('empty'));

/**
 * defer -  creates an Observable that creates this generator function (like creating our own observable)
 *          and invokes this function every time subscriber subscribes to it
 */
var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
    sideEffect++;
    return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe((0, _util.createSubscriber)('defer$.one'));
defer$.subscribe((0, _util.createSubscriber)('defer$.two'));
defer$.subscribe((0, _util.createSubscriber)('defer$.three'));

/**
 * empty - does not produce any items but it COMPLETES
 * never - never produces no items and never completes
 */
_Rx2.default.Observable.never().subscribe((0, _util.createSubscriber)('never'));

/**
 * range(startNumber, totalCount)
 */
_Rx2.default.Observable.range(10, 30).subscribe((0, _util.createSubscriber)('range'));