/** CSS selectors in selectorArray to get rid of YouTube Shorts: 
 * 0: Mini side menu
 * 1: Large side menu
 * 2: Section on home screen
 * 3: Shorts in subscriptions
 * 4: Section in search results
 * 5: Shorts in search results (based on aria label for video title, case insensitive)
 * 6: Shorts in search results (based on overlay-style for "shorts" logo over video thumbnail)
 * 7: Prevent infinite scrolling after entering a YouTube Short
 */ 

// Applied in CSSselectors.js
const selectorArray = [
    'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
    'ytd-guide-entry-renderer:has([title="Shorts"])',
    'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
    'ytd-grid-video-renderer:has([overlay-style="SHORTS"])',
    'ytd-reel-shelf-renderer',
    'ytd-video-renderer:has([aria-label*="#shorts"i])',
    'ytd-video-renderer:has([overlay-style="SHORTS"])',
    'ytd-reel-video-renderer[id]:not([id="0"])'
];

// Number of sections in the home video page that shows up. Allowed to be positive numbers. Handles channels as a special case with :not([page-subtype="channels"])
const homePageSections = 3;

if (homePageSections > 0) {
    selectorArray.push(
        `ytd-two-column-browse-results-renderer:not([page-subtype="channels"]) #contents:has(ytd-rich-grid-row)>:nth-child(n + ${homePageSections + 1})`
    );
}