/** CSS selectors in selectorArray to get rid of infinite scrolling and reels: 
 * 0: Hiding home screen "Suggested posts" text
 * 1: Hiding home screen suggested posts
 * 2: Hiding home screen loading logo (not removing it results in infinite loading under suggested posts!)
 * 3: Hiding home screen "For you" feed button. (Finally, a great change from Instagram! Now you can view only the posts of people you follow by going to instagram.com/?variant=following!)
 * 4: Hiding posts/reels "More posts from ____" (on instagram.com/p/* and instagram.com/reel/*)
 * 5: Hiding reels menu tab
 * 6: Hiding reels menu tab on instagram page (instagram.com/<pagename>/reels/)
 * 7: Hiding reels on instagram page (instagram.com/<pagename>/reels/*)
 * 8: Hiding explore page menu tab
 * 9: Hiding explore page posts/reels
 */ 

// Applied in CSSselectors.js
const selectorArray = [
    'main div:not([class])>div:has(article)>article~div[class]>:last-child',
    'main div:not([class])>div:has(article)>div[class]~article',
    'main div._aalg',
    'div[style="--igdstabgroup-column-count: 2;"]>:first-child',
    'main>div>div~*[class*="_aa6g"]',
    'a[role="link"][href="/reels/"]',
    'a[role="tab"][href$="/reels/"]',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="_ac7v _al5r"])',
    'div:not([class]):has(>span>div>a[href="/explore/"])',
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="x9f619 xjbqb8w x1lliihq x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"])'
];