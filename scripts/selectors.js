function Selector(description, active, selector) {
    this.description = description;
    this.active = active;
    this.selector = selector;
}

// Convert the selector array to a string, for use as a CSS selector
function stringifySelectors(selectors) {
    let string = '';

    for(let i = 0; i < selectors.length; i++) {
        if (selectors[i].active) {
            if (string == '') {
                string = `${selectors[i].selector}`
            } else {
                string += `,\n${selectors[i].selector}`;
            }
        }
    }

    return string;
}

// Add the CSS styling
function addCSS(selectors) {
    $('html').prepend(
        `<style>
        ${stringifySelectors(selectors)} {
            display: none!important;
        }
        </style>`
    );
}

// TODO: Group selectors based on similar properties. For example disabling all reels or shorts at once.

window.facebookSelectors = [
    new Selector('Reels tab', true, 'div:has(>[class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x10b6aqq x1yrsyyn x1iyjqo2"])>:nth-child(2)'),
    new Selector('Reels tray', true, 'div[aria-label="Reels tray"]'),
    new Selector('Reels buttons', true, '[role="button"]:has(div[aria-label*="Card"])'),
    new Selector('Watch tab' , true, 'ul[class="xuk3077 x78zum5 x1iyjqo2 xl56j7k x1p8ty84 x1na7pl x88anuq"]>:nth-child(2)'),
    new Selector('Watch videos' , true, 'div:has(>[aria-label*="Facebook Watch"])'),
    new Selector('"Gaming Video" tab' , true, 'ul:not([class]) li:has(a[href*="video" i])'),
    new Selector('"Live videos" and "Watch" tab' , true, 'ul:not([class]) li:has(a[href*="watch" i])'),
    new Selector('Video recommendations below videos' , true, 'div.x78zum5:has(>div[class="x78zum5 x4pn7vq xkrivgy x1gryazu"])'),
    new Selector('Sponsored posts' , true, 'div.x1lliihq:has([rel="nofollow noreferrer"])'),
    new Selector('Sponsored posts special case' , true, 'div.x1lliihq:has(a[href*="/ads/"])'),
    new Selector('Sponsored posts tab' , true, 'div.x1y1aw1k>div:not([class])>span:has(div:not([class]))')
];
/** Possible selector:
 * div[class*="x6s0dn4 x78zum5 x1q0g3np x5yr21d xl56j7k xh8yej3"] to remove everything when viewing a reel
*/

window.instagramSelectors = [
    new Selector('Home screen "Suggested posts" texxt', true, 'main div:not([class])>div:has(article)>article~div[class]>:last-child'),
    new Selector('Home screen suggested posts', true, 'main div:not([class])>div:has(article)>div[class]~article'),
    new Selector('Infinite loading', true, 'main div._aalg'),
    new Selector('"For you" feed button', true, 'div[style="--igdstabgroup-column-count: 2;"]>:first-child'),
    new Selector('"More posts from ..." in posts/reels', true, 'main>div>div~*[class*="_aa6g"]'),
    new Selector('Reels menu tab' , true, 'a[role="link"][href="/reels/"]'),
    new Selector('Reels tab on a user page' , true, 'a[role="tab"][href$="/reels/"]'),
    new Selector('Reels on a user page' , true, 'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="_ac7v _al5r"])'),
    new Selector('Explore menu tab' , true, 'div:not([class]):has(>span>div>a[href="/explore/"])'),
    new Selector('Explore page posts/reels' , true, 'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="x9f619 xjbqb8w x1lliihq x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"])'),
];

window.tiktokSelectors = [
    new Selector('Only showing one post on recommended page', true, '[data-e2e="recommend-list-item-container"]~[data-e2e="recommend-list-item-container"]'),
    new Selector('Remove loading symbol on recommended page', true, 'svg[class*="tiktok-qmnyxf-SvgContainer"]')
];

window.youtubeSelectors = [
    new Selector('Shorts side menu (mini mode)', true, 'ytd-mini-guide-entry-renderer[aria-label="Shorts"]'),
    new Selector('Shorts side menu (large mode)', true, 'ytd-guide-entry-renderer:has([title="Shorts"])'),
    new Selector('Shorts on recommended page', true, 'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])'),
    new Selector('Shorts in subscriptions (small videos in grid)', true, 'ytd-grid-video-renderer:has([overlay-style="SHORTS"])'),
    new Selector('Shorts in subscriptions (large videos in grid)', true, 'ytd-rich-item-renderer:has([overlay-style="SHORTS"])'),
    new Selector('Shorts section in search results', true, 'ytd-reel-shelf-renderer'),
    new Selector('Shorts section in search results (based on aria-label)', true, 'ytd-video-renderer:has([aria-label*="#shorts"i])'),
    new Selector('Shorts section in search results (based on the "shorts" logo over thumbnail)', true, 'ytd-video-renderer:has([overlay-style="SHORTS"])'),
    new Selector('Prevent scrolling in a short video', true, 'ytd-reel-video-renderer[id]:not([id="0"])')
];