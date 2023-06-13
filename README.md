# reels-blocker

This browser extension is created with the goal of removing reels/short videos and infinite scrolling from several websites without affecting the actual content from friends and liked pages. Its purpose is to save time, improve mental health and boost productivity. The websites affected by this browser extension are Facebook, Instagram, TikTok and YouTube.

An installation guide can be found [at the bottom of this page](#installing).

&nbsp;

## How it works

- The `manifest.json` file configures which JavaScript files should run when visiting Facebook, Instagram, TikTok and YouTube.
- In these files, arrays of CSS selectors (called `selectorArray`) are created specifically for that website. The CSS selectors identify elements which should be hidden or removed.
- In `CSSselectors.js`, the selector array is made into a string. A style element is prepended to the HTML element of these websites, which hides the elements from the website:

```
$('html').prepend(
    `<style>
    ${stringifiedArray} {
        display: none!important;
    }
    </style>`
);
```

For Facebook, a `MutationObserver` is also added to remove "Suggested for you" and "Reels and short videos" from the feed as soon as these posts load in. Currently this works most of the time, and either works very well or not at all.

&nbsp;

## What is removed from each website

### Facebook:

- All Facebook Reels.
- All Facebook Videos.
- All "Suggested for you" and "Reels and short videos" posts in the home feed.
- All sponsored posts.

### Instagram:

- All Instagram Reels.
- The "Explore" page.
- The "Suggested for you" section on the homepage (which has infinite scrolling and shows up after viewing all posts from followed pages).
- "More posts from \_\_\_\_" when viewing a post or a reel.

### TikTok:

- Infinite scrolling on recommended page.

**Note: As the entire concept of TikTok is based on reels and infinite scrolling, I would recommend an extension for blocking this specific website if that is of interest.**

### YouTube:

- All YouTube Shorts.
- Infinite scrolling on the homepage. Hardcoded to 3 rows of videos but can be adjusted by changing `const homePageSections = 3;` to another value in `reels-blocker/extension/youtube.js`.

&nbsp;

## Installing:

I primarily made this extension for my own productivity but if it is of interest to anyone else I have included this installation guide. The installing is based on the top rated answer to [this Stack Overflow question](https://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system):

1. Clone this project
2. Go to `chrome://extensions/` in your browser
3. Activate "Developer mode" in the top right corner
4. Click <kbd>Load Unpacked Extension</kbd>
5. Navigate to the local folder containing the extension’s code (the folder `<your-path>/reels-blocker/extension` in this case) and click Ok
