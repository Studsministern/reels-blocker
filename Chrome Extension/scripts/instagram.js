/** CSS selectors in selectorArray to get rid of infinite scrolling and reels: 
 * 0: Hiding "Suggested posts" text on home screen
 * 1: Hiding the actual suggested posts on home screen
 * 2: Hiding loading logo for more posts (not removing it results in infinite loading under suggested posts!)
 * 3: Hiding "More posts from ____" under posts (instagram.com/p/*) and reels (instagram.com/reel/*)
 * 
 * Seems important to use \" instead of just " in the selectorArray below!
 */ 

const selectorArray = [
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])>:last-child',
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])~article',
    'main div._aalg',
    'main>div>div~*[class*=\"_aa6g\"]'
];

const stringifiedArray = (() => {
    let string = selectorArray[0];

    for(let i = 1; i < selectorArray.length; i++) {
        string += `,\n${selectorArray[i]}`;
    }

    return string;
})();

$('html').prepend(
    `<style>
    ${stringifiedArray} {
        display: none!important;
    }
    </style>`
);
