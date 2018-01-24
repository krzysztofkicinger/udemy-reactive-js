'use strict';

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


_fs2.default.readdir('./src-server', function (err, items) {
    if (err) {
        console.log(err);
    } else {
        console.log(items);
    }
});