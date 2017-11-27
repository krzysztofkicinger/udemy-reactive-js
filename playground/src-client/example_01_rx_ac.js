import $ from 'jquery';
import Rx from 'rxjs/Rx';

$(document).ready(() => {

    const $title = $("#title");
    const $results = $("#results");

    // Everything can be a database (stream)
    // -------------------------------------------
    // This takes the keyup event on this element and
    // it's going to return a observable stream of the
    // keyup event
    const keyUps$ = Rx.Observable.fromEvent($title, 'keyup');

    // distinctUntilChanged() - operator that returns new Observable stream,
    //                          produces a value only if that value has changed from the previous state
    const queries$ = keyUps$
        .map(e => e.target.value)
        .distinctUntilChanged();

    const debouncedQueries$ = queries$.debounceTime(500);

    /*
        MERGE MAP:
            - It passes to the function current item that appeared in the base Observable
            - Then it calls a callback that can return:
                - Observable
                - Sequence
                - Promise
                - (couple of other things)
            - All of the Observables/... that callback returns will be merged into a Stream
            - It happens in parallel so things can be out of order
     */
    const items$ = debouncedQueries$.mergeMap(getItems);   // mergeMap = flatMap / SelectMany

    /*
        SWITCH MAP:
            - If new query comes in, before anything was returned for the previous item then it discard the old data
            - It only provides the result for latest value that appeared in base Observable
     */
    const orderedItems$ = debouncedQueries$.switchMap(getItems); // flatMapLatest

    const queriesCombined$ = keyUps$.map(event => event.target.value)
        .distinctUntilChanged() // React only for changes not for each keyup event (for example for moving the cursor using arrows)
        .debounceTime(500)
        .switchMap(getItems);

    // keyUps$.subscribe(e => {
    //     getItems(e.target.value)
    //         .then(items => {
    //             $results.empty();
    //             $results.append(items.map(r => $('<li>').text(r)));
    //         });
    //     // console.log(`Event ${e}`);
    //     console.log(`Event `, e);
    // })

    // queries$.subscribe(query => {
    //     getItems(query)
    //         .then(items => {
    //             $results.empty();
    //             $results.append(items.map(r => $('<li>').text(r)));
    //         });
    //     console.log(`Event `, e);
    // });

    // debouncedQueries$.subscribe(query => {
    //     getItems(query)
    //         .then(items => {
    //             $results.empty();
    //             $results.append(items.map(r => $('<li>').text(r)));
    //         });
    // });

    // orderedItems$.subscribe(items => {
    //     $results.empty();
    //     $results.append(items.map(item => $('<li>').text(item)));
    // })

    queriesCombined$.subscribe(items => {
        $results.empty();
        $results.append(items.map(item => $('<li>').text(item)));
    });

    // Rx.Observable.fromEvent($title, "keyup")
    //     .map(event => event.target.value)
    //     .distinctUntilChanged()
    //     .debounceTime(500)
    //     .switchMap(getItems)
    //     .subscribe(items => {
    //         $results.empty();
    //         $results.append(items.map(i => $('<li>').text(i)));
    //     });

});

const getItems = title =>
    new Promise((resolve, reject) =>
        window.setTimeout(
            () => resolve([title, `Item 2`, `Item 3`]),
            500 + (Math.random() * 600)
        )
    );