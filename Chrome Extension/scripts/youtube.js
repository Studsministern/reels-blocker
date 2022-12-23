(() => {
    function hide(selector) {
        const html = document.querySelector(selector);
        if(html && !html.classList.contains('hide')) html.classList.add('hide');
    }

    function hideHTML() {
        // YouTube shorts menus:
        hide('ytd-mini-guide-entry-renderer[aria-label=\"Shorts\"]');
        hide('ytd-guide-entry-renderer:has([title=\"Shorts\"])');
    };
    
    $('html').append(`
        <style>
        .hide {
            visibility: collapse!important;
            height: 0!important;
            width: 0!important;
        }
        </style>`
    );
    
    window.addEventListener("load", hideHTML);
    //window.addEventListener("yt-page-data-updated", hideHTML);
    //window.addEventListener("state-navigateend", hideHTML);
})();
