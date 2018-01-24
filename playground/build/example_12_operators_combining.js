'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function arrayZip(array1, array2, selector) {
//     const count = Math.min(array1.length, array2.length);
//     const results = [];
//
//     for (let i = 0; i < count; i++) {
//         const combined = selector(array1[i], array2[i]);
//         results.push(combined)
//     }
//
//     return results;
// }
//
// const array1 = [1, 2, 3, 4, 5];
// const array2 = [11, 22, 33, 44, 55];
//
// const results = arrayZip(array1, array2, (left, right) => left * right);
// console.log(results);

/**
 * OPERATOR ZIP:
 *  - combines two Observables by invoking selector operation
 *  - if any of two Observables completes then 'zip' Observable also completes
 */
// Rx.Observable.range(1, 10)
//     .zip(Rx.Observable.interval(500), (left, right) => `Item: ${left}, at ${right}`)
//     .subscribe(createSubscriber('zip'));

/**
 * OPERATOR WITHLATESTFROM:
 *  - emits an item only if source emits an item
 *  - the source item is combined with the last item from the destination
 */
// Rx.Observable.interval(1000)
//     .withLatestFrom(Rx.Observable.interval(500))
//     .take(10)
//     .subscribe(createSubscriber('withLatestFrom'));

/**
 * OPERATOR COMBINELATEST:
 *  - emits an item if source or destination emit an item
 *  - matches two latest items from both observables
 */
// Rx.Observable.interval(1000)
//     .combineLatest(Rx.Observable.interval(500))
//     .take(10)
//     .subscribe(createSubscriber('combineLatest'));
//
// Rx.Observable.interval(1000)
//     .combineLatest(Rx.Observable.interval(500), (left, right) => `Left: ${left}, Right: ${right}`)
//     .take(10)
//     .subscribe(createSubscriber('combineLatest'));

var currentUser$ = new _Rx2.default.BehaviorSubject({
    isLoggedIn: false
});

_Rx2.default.Observable.interval(1000)
// .withLatestFrom(currentUser$)
.combineLatest(currentUser$).do(console.log).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        i = _ref2[0],
        user = _ref2[1];

    return user.isLoggedIn;
}).take(5).subscribe((0, _util.createSubscriber)('withLatestFrom'));

setTimeout(function () {
    currentUser$.next({
        isLoggedIn: true
    });
}, 2500);