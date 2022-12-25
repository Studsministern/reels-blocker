/** CSS selectors in selectorArray to get rid of infinite scrolling and reels: 
 * 0: Hiding home screen "Suggested posts" text
 * 1: Hiding home screen suggested posts
 * 2: Hiding home screen loading logo (not removing it results in infinite loading under suggested posts!)
 * 3: Hiding posts/reels "More posts from ____" (on instagram.com/p/* and instagram.com/reel/*)
 * 4: Hiding page reels menu tab
 * 5: Hiding page reels (instagram.com/pagename/reels/*)
 * 6: Hiding explore page menu tab
 * 7: Hiding explore page posts/reels
 * 
 * Seems important to use \" instead of just " in the selectorArray below!
 */ 

const selectorArray = [
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])>:last-child',
    'main div[style*=\"position: relative; display: flex; flex-direction: column;\"]>div:not([class])~article',
    'main div._aalg',
    'main>div>div~*[class*=\"_aa6g\"]',
    'main a[role=\"tab\"][href$=\"reels/\"]',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class=\"_ac7v _abq4\"])',
    'div:not([class]):has(>div>a[href=\"/explore/\"])',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class=\" _ab8x  _ab94 _ab99 _ab9f _ab9m _ab9p _abcm\"])'
];

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
