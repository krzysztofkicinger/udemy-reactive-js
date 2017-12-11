# Observables

## Hot vs Cold Observables

**Hot Observable**

- Produces a value no matter if some Subscriber is listening for events
- Rx.Observable.fromEvent(...) - event will be fired regardless of number of Subscribers
- Does not pass historical data only the data after plugging in
- Hot Observable can be changed to cold one by proxying it with a Subject

```js
Rx.Observable.fromEvent($title, 'keyup')
```

**Cold Observable**

- Starts doing sth after subscribing to it
- Passes every historical value to newly plugged in Subscribers
- Cold Observable can be change into hot one using public method - returns a **Connected Observable**
    - It will not connect to Base Observable until it **connect()** method is not invoked
    - The moment connect() is invoked the Base Observable starts doing its job and pushed values 

```js
const interval$ = Rx.Observable.interval(1000)
    .take(10)
    .publish();

interval$.connect();
```

**When do we want to change Cold into Hot Observable?**

## Reference Count

A way to automatically handle the connection and the subscription of a Connectable Observable



