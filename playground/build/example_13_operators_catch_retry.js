'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rx.Observable.concat(
//     Rx.Observable.of(42),
//     Rx.Observable.throw(new Error('BLEGH')),
//     Rx.Observable.of(10)
// ).subscribe(createSubscriber('catch'));
//

var getApi = function getApi() {
    return new _Rx2.default.Observable(function (observer) {
        console.log('Getting API');
        observer.error(new Error("Connection refused"));
        observer.next("Hello");
        observer.complete();
    });
};

var apiCall$ = new _Rx2.default.Observable(function (observer) {
    setTimeout(function () {
        return observer.error(new Error("Connection refused"));
    }, 1000);
    setTimeout(function () {
        return observer.next("Hello");
    }, 3000);
});

/**
 *  retry() -> tries to get another time the correct value
 *      - retry subscribes to the Observable
 *      - if there is an error it unsubscribes it ant then subscribest to it again
 *  catch() -> catches an error and emits it as normal item (using next() method)
 *
 */
// Rx.Observable.fromPromise(getApi())
// getApi()
apiCall$.retry(10)
// .catch(error => Rx.Observable.of(error))
.subscribe((0, _util.createSubscriber)('api'));