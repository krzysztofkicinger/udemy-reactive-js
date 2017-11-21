import moment from 'moment';
import $ from 'jquery';

$(document).ready(() => {
    $("body").text(moment().format());
});

console.log("Test");