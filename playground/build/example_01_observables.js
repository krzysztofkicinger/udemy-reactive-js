"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promise = new Promise(function (resolve, reject) {
    resolve("HEY");
});

promise.then(function (item) {
    return console.log(item);
});

var simple$ = new _Rx2.default.Observable(function (observer) {
    console.log("Generating observable");
    setTimeout(function () {
        observer.next("An item!");
        setTimeout(function () {
            observer.next("Another item!");
            observer.complete();
        }, 1000);
    }, 1000);
});

simple$.subscribe(function (item) {
    return console.log(item);
}, function (error) {
    return console.error(error);
}, function () {
    return console.log("Observable completed");
});

setTimeout(function () {
    simple$.subscribe({
        next: function next(item) {
            return console.log("Object - next: " + item);
        },
        error: function error(_error) {
            return console.log("Object - error: " + _error);
        },
        complete: function complete() {
            return console.log('Object - complete');
        }
    });
}, 3000);

var error$ = new _Rx2.default.Observable(function (observer) {
    observer.error(new Error('Error from observable'));
});

error$.subscribe(function (item) {
    return console.log("Error observable - item " + item);
}, function (error) {
    return console.error("Error observable - error ", error);
}, function () {
    return console.log("Error observable completed");
});

function createInterval$(time) {
    return new _Rx2.default.Observable(function (observer) {
        var index = 0;
        var interval = setInterval(function () {
            console.log("Generating " + index);
            observer.next(index++);
        }, time);

        return function () {
            return clearInterval(interval);
        };
    });
}

var everySecond$ = createInterval$(1000);
var subscription = everySecond$.subscribe((0, _util.createSubscriber)("one"));
var subscription2 = everySecond$.take(3).subscribe((0, _util.createSubscriber)("two"));

setTimeout(function () {
    return subscription.unsubscribe();
}, 3000);

/*
    CREATING AN OPERATOR
 */

function take$(sourceObservable$, amount) {
    return new _Rx2.default.Observable(function (observer) {
        var count = 0;
        var subscription = sourceObservable$.subscribe({
            next: function next(item) {
                observer.next(item);
                if (++count === amount) {
                    observer.complete();
                }
            },
            error: function error(err) {
                return observer.error(err);
            },
            complete: function complete() {
                return observer.complete();
            }
        });
        return function () {
            return subscription.unsubscribe();
        };
    });
}

var everySecondForFirstFives$ = createInterval$(1000);
var firstFive$ = take$(everySecondForFirstFives$, 5);
firstFive$.subscribe((0, _util.createSubscriber)("firstFive"));