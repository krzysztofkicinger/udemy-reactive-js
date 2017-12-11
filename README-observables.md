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
- 