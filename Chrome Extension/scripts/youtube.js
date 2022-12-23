(() => {
    /** CSS selectors to get rid of YouTube Shorts, in order: 
     * YouTube Shorts mini side menu
     * YouTube Shorts large side menu
     * YouTube Shorts section on home screen
     * YouTube Shorts in subscriptions
     * 
     * Important to use \" instead of just "
     */ 

    const selectorArray = [
        'ytd-mini-guide-entry-renderer[aria-label=\"Shorts\"]',
        'ytd-guide-entry-renderer:has([title=\"Shorts\"])',
        'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
        'ytd-grid-video-renderer:has(span.ytd-thumbnail-overlay-time-status-renderer[aria-label=\"Shorts\"])'
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
