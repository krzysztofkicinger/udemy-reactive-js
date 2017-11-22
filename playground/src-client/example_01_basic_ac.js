import $ from 'jquery';

$(document).ready(() => {

    const $title = $("#title");
    const $results = $("#results");

    let lastQuery = null;
    let lastTimeout = null;
    let nextQueryId = 0;
    $title.on('keyup', e => {
        const value = e.target.value;

        if (value === lastQuery) {
            return;
        }

        lastQuery = value;

        if (lastTimeout) {
            window.clearTimeout(lastTimeout);
        }

        let queryId = ++nextQueryId;
        lastTimeout = window.setTimeout(() => {
            getItems(value)
                .then(items => {
                    if(queryId !== nextQueryId) {
                        return;
                    }

                    $results.empty();

                    const $items = items.map(item => $('<li>').text(item));
                    $results.append($items);
                });
        }, 500);

    });

    function getItems(title) {
        console.log(`Querying ${title}`);
        return new Promise((resolve, reject) => {
            window.setTimeout(
                () => {
                    resolve([title, "Item 2", `Another ${Math.random()}`])
                }, 500 + (Math.random() * 600)
            )
        })
    }
});

console.log("Test");