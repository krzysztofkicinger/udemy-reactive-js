'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * fromEvent - creates an Observable that checks if specific event has happened
 *      - it does not know what event (object) is passed so it must detect the event pattern
 *      - it binds an event object that support particular event
 *      - behind the scenes uses: on, addEventListener etc. methods
 */
_Rx2.default.Observable.fromEvent();