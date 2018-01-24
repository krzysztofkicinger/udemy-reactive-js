'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var readdir$ = _Rx2.default.Observable.bindNodeCallback(_fs2.default.readdir);
console.log('Type - bindNodeCallback: ' + (typeof readdir$ === 'undefined' ? 'undefined' : _typeof(readdir$)));

readdir$('./src-server').mergeMap(function (files) {
    return _Rx2.default.Observable.from(files);
}).map(function (file) {
    return 'Manipulated ' + file;
}).subscribe((0, _util.createSubscriber)('readdir'));

/**
 * PROMISES:
 *  - fromPromise(promise) - returns Observable from Promise
 */
function getItem() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve('Hello');
        }, 1000);
    });
}

_Rx2.default.Observable.fromPromise(getItem()).subscribe((0, _util.createSubscriber)('promise'));