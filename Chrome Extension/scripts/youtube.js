(() => {
    /** CSS selectors to get rid of YouTube Shorts: 
     * 0: YouTube Shorts mini side menu
     * 1: YouTube Shorts large side menu
     * 2: YouTube Shorts section on home screen
     * 3: YouTube Shorts in subscriptions
     * 4: YouTube Shorts section in search results
     * 5: YouTube Shorts in search results (based on aria label for video title, case insensitive)
     * 6: YouTube Shorts in search results (based on overlay-style for "shorts" logo over video thumbnail)
     * 
     * Important to use \" instead of just "
     */ 

    const selectorArray = [
        'ytd-mini-guide-entry-renderer[aria-label=\"Shorts\"]',
        'ytd-guide-entry-renderer:has([title=\"Shorts\"])',
        'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
        'ytd-grid-video-renderer:has([overlay-style=\"SHORTS\"])',
        'ytd-reel-shelf-renderer',
        'ytd-video-renderer:has([aria-label*="#shorts"i])',
        'ytd-video-renderer:has([overlay-style="SHORTS"])'
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
})();
