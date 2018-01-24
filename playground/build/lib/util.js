"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function createSubscriber(tag) {
    return {
        next: function next(item) {
            return console.log(tag + ".next " + item);
        },
        error: function error(_error) {
            return console.error(tag + ".error " + _error);
        },
        complete: function complete() {
            return console.log(tag + ".completed");
        }
    };
}
exports.createSubscriber = createSubscriber;