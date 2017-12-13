import Rx from 'rxjs/Rx';
import {createSubscriber} from "./lib/util";

// Rx.Observable.concat(
//     Rx.Observable.of(42),
//     Rx.Observable.throw(new Error('BLEGH')),
//     Rx.Observable.of(10)
// ).subscribe(createSubscriber('catch'));
//

const getApi = () => {
    return new Rx.Observable(observer => {
        console.log('Getting API');
        observer.error(new Error("Connection refused"));
        observer.next("Hello");
        observer.complete();
    });
};

const apiCall$ = new Rx.Observable(observer => {
    setTimeout(() => observer.error(new Error("Connection refused")), 1000);
    setTimeout(() => observer.next("Hello"), 3000);
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
apiCall$
    .retry(10)
    // .catch(error => Rx.Observable.of(error))
    .subscribe(createSubscriber('api'));