(() => {
    /** CSS selectors in selectorArray to get rid of YouTube Shorts: 
     * 0: Mini side menu
     * 1: Large side menu
     * 2: Section on home screen
     * 3: Shorts in subscriptions
     * 4: Section in search results
     * 5: Shorts in search results (based on aria label for video title, case insensitive)
     * 6: Shorts in search results (based on overlay-style for "shorts" logo over video thumbnail)
     * 7: Prevent infinite scrolling after entering a YouTube Short
     * 
     * Seems important to use \" instead of just " in the selectorArray below!
     */ 

    const selectorArray = [
        'ytd-mini-guide-entry-renderer[aria-label=\"Shorts\"]',
        'ytd-guide-entry-renderer:has([title=\"Shorts\"])',
        'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
        'ytd-grid-video-renderer:has([overlay-style=\"SHORTS\"])',
        'ytd-reel-shelf-renderer',
        'ytd-video-renderer:has([aria-label*=\"#shorts"i])',
        'ytd-video-renderer:has([overlay-style=\"SHORTS\"])',
        'ytd-reel-video-renderer[id]:not([id=\"0\"])'
    ];

    // Number of sections in the home video page that shows up. Even setting homePageSections to 1 will results in 
    const homePageSections = 3;

    if (homePageSections > 0) {
        selectorArray.push(
            `div#contents:has(ytd-rich-grid-row)>:nth-child(n + ${homePageSections + 1})`
        );
    }

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
})();
