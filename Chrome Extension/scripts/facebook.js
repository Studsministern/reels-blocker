/** CSS selectors in selectorArray to get rid of infinite videos and reels: 
 * 0: Home screen reels tab
 * 1: Home screen reels tray
 * 2: Reel buttons moving to previous and next reels
 * 3: Facebook Watch tab
 * 4: Facebook Watch videos
 * 5: Side menu 'Gaming Video' tab
 * 6: Side menu 'Live Videos' and 'Watch' tabs
 * 7: Video recommendations below a video
 * 
 * Seems important to use \" instead of just " in the selectorArray below!
 */ 

/** Possible selector:
 * div[class*="x6s0dn4 x78zum5 x1q0g3np x5yr21d xl56j7k xh8yej3"] to remove everything when viewing a reel
*/

 const selectorArray = [
    'div:has(>[class=\"x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x10b6aqq x1yrsyyn x1iyjqo2\"])>:nth-child(2)',
    'div[aria-label=\"Reels tray\"]',
    '[role="button"]:has(div[aria-label*=\"Card\"])',
    'ul[class=\"xuk3077 x78zum5 x1iyjqo2 xl56j7k x1p8ty84 x1na7pl x88anuq\"]>:nth-child(2)',
    'div:has(>[aria-label*=\"Facebook Watch\"])',
    'ul:not([class]) li:has(a[href*=\"video\" i])',
    'ul:not([class]) li:has(a[href*=\"watch\" i])',
    'div[class=\"x78zum5\"]:has(>div[class=\"x78zum5 x4pn7vq xkrivgy x1gryazu\"])'
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
