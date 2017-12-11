# Subjects

## Introduction

- Object that is both and Observable and Observer
- Often used (but last resort) to bridge non-reactive code with reactive code

## How to create Subject?

```js
const simple$ = new Rx.Subject();
```

## How to replace Subject?

- Think where the data is coming from
- Create observable workflow that hooks into those sources