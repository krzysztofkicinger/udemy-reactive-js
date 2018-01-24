'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * OPERATOR DO - processes a value but does not affects it
 */
_Rx2.default.Observable.range(1, 10).do(function (a) {
  return console.log('From do ' + a);
}).map(function (a) {
  return Math.pow(a, 2);
}).subscribe((0, _util.createSubscriber)('simple-do'));

/**
 * OPERATOR FINALLY - affect side effects when Observable completes
 */
_Rx2.default.Observable.range(1, 10).finally(function () {
  return console.log('From finally');
}).map(function (a) {
  return Math.pow(a, 2);
}).subscribe((0, _util.createSubscriber)('simple-finally'));

/**
 * OPERATOR FILTER - takes a predicate and filters base Observable
 */
_Rx2.default.Observable.range(1, 10).filter(function (a) {
  return a < 5;
}).map(function (a) {
  return Math.pow(a, 2);
}).subscribe((0, _util.createSubscriber)('simple-filter'));

/**
 * OPERATOR STARTWITH - adds a first value to the base observable
 */
_Rx2.default.Observable.interval(1000).startWith('START').subscribe((0, _util.createSubscriber)('simple-interval'));