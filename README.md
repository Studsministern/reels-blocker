# reels-blocker

This project is created as a productivity web extension, with the goal of removing all traces of infinite scrolling and reels from several websites without removing the actual content from friends and liked pages. This is done by prepending CSS selectors to the HTML element of these websites. A MutationObserver is also added to Facebook to remove "Suggested for you" posts.

The content removed from the following websites is:

### Instagram:
- All menu tabs for Instagram "Reels".
- All menu tabs for the "Explore" page.
- All posts on the "Explore" page.
- The "Suggested for you" section on the homepage (which has infinite scrolling).
- "More posts from ____" when viewing a post or a reel.

### Facebook:
- All Facebook Reels.
- All Facebook Videos.
- All "Suggested for you" posts.

### YouTube:
- Infinite scrolling on the homepage. Hardcoded to 3 rows of videos but can be adjusted by changing `const homePageSections = 3;` to another value in *"/Chrome Extension/scripts/youtube.js"*.
- YouTube Shorts on homepage, in subscriptions and when searching.
- YouTube Shorts infinite scrolling when linked to a Short from another source.

### TikTok:
- Infinite scrolling on recommended page.

**Note: As the entire concept of TikTok is based on reels and infinite scrolling, I would recommend an extension for blocking this specific website if that is of interest.**

&nbsp;

## Installing:
I primarily made this extension for my own productivity but if testing the code is of interest I have included this installation guide. The installing is based on the top rated answer to [this Stack Overflow question](https://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system):
1. Clone this project
2. Go to chrome://extensions/
3. Activate "Developer mode" in the top right corner
4. Click "Load Unpacked Extension"
5. Navigate to the local folder containing the extension’s code (the folder *"/Chrome Extension"* in this case) and click Ok
