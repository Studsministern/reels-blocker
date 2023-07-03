/** CSS selectors in selectorArray to get rid of infinite scrolling and reels: 
 * 0: Hiding home screen "For you" feed button. (Finally, a great change from Instagram! Now you can view only the posts of people you follow!)
 * 1: Hiding posts/reels "More posts from ____" (on instagram.com/p/* and instagram.com/reel/*)
 * 2: Hiding reels menu tab
 * 3: Hiding reels menu tab on instagram page (instagram.com/<pagename>/reels/)
 * 4: Hiding reels on instagram page (instagram.com/<pagename>/reels/*)
 * 5: Hiding explore page menu tab
 * 6: Hiding explore page posts/reels
 */ 

// Applied in CSSselectors.js
const selectorArray = [
    '[aria-label="For you"]',
    'main>div>div~*[class*="_aa6g"]',
    'a[role="link"][href="/reels/"]',
    'a[role="tab"][href$="/reels/"]',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="_ac7v _al5r"])',
    'div:not([class]):has(>span>div>a[href="/explore/"])',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="x9f619 xjbqb8w x1lliihq x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"])'
];