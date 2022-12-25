/** CSS selectors in selectorArray to get rid of infinite scrolling and reels: 
 * 0: Hiding "Suggested posts" text on home screen
 * 1: Hiding the actual suggested posts on home screen
 * 2: Hiding loading logo for more posts (not removing it results in infinite loading under suggested posts!)
 * 3: Hiding "More posts from ____" under posts (instagram.com/p/*) and reels (instagram.com/reel/*)
 * 4: Hiding reels menu tab on a page
 * 5: Hiding reels on a page (instagram.com/pagename/reels/*)
 * 
 * Seems important to use \" instead of just " in the selectorArray below!
 */ 

const selectorArray = [
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])>:last-child',
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])~article',
    'main div._aalg',
    'main>div>div~*[class*=\"_aa6g\"]',
    'main a[role=\"tab\"][href$=\"reels/\"]',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class=\"_ac7v _abq4\"])'
];

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
