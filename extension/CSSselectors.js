// This file will automatically run in the order which is specified in manifest.json
// It will use the selectorArray specified in another JavaScript file and prepend the 
// CSS selectors to the html

// Convert the selector array to a string, for use as a CSS selector
const stringifiedArray = (() => {
    let string = selectorArray[0];

    for(let i = 1; i < selectorArray.length; i++) {
        string += `,\n${selectorArray[i]}`;
    }

    return string;
})();

// Add the CSS styling
$('html').prepend(
    `<style>
    ${stringifiedArray} {
        display: none!important;
    }
    </style>`
);