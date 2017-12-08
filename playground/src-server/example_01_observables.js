import Rx from 'rxjs/Rx';

const promise = new Promise((resolve, reject) => {
    resolve("HEY");
});

promise.then(item => console.log(item));

const simple$ = new Rx.Observable(observer => {
    console.log("Generating observable");
    setTimeout(
        () => {
            observer.next("An item!");
            setTimeout(
                () => {
                    observer.next("Another item!");
                    observer.complete();
                }, 1000
            )
        }, 1000);
});

simple$.subscribe(
    item => console.log(item),
    error => console.error(error),
    () => console.log("Observable completed")
);

setTimeout(
    () => {
        simple$.subscribe({
            next: item => console.log(`Object - next: ${item}`),
            error: error => console.log(`Object - error: ${error}`),
            complete: () => console.log('Object - complete')
        })
    }, 3000
);

const error$ = new Rx.Observable(observer => {
    observer.error(new Error('Error from observable'));
});

error$.subscribe(
    item => console.log(`Error observable - item ${item}`),
    error => console.error(`Error observable - error `, error),
    () => console.log("Error observable completed")
);


function createInterval$(time) {
    return new Rx.Observable(observer => {
        let index = 0;
        setInterval(
            () => {
                console.log(`Generating ${index}`);
                observer.next(index++);
            }, time
        )
    })
}

function createSubscriber(tag) {
    return {
        next: item => console.log(`${tag}.next ${item}`),
        error: error => console.error(`${tag}.error ${error}`),
        complete: () => console.log(`${tag}.completed`),
    }
}

const everySecond$ = createInterval$(1000);
const subscription = everySecond$.subscribe(createSubscriber("one"));

setTimeout(() =>
    subscription.unsubscribe()
, 3000);