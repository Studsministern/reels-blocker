import $ from 'jquery';

/**
 * Class representing an option that can be toggled on or off.
 *
 * @param description The description of the option
 * @param active Whether the option is active or not
 * @param selector The CSS selector for the option
 */
export class Option {
  description: string;
  active: boolean;
  selector: string;

  constructor(description: string, active: boolean, selector: string) {
    this.description = description;
    this.active = active;
    this.selector = selector;
  }
}

// A variable where each website name is matched with an arrays of options for that website
export let websiteOptions: Record<string, Option[]> = {};

// TODO: Group options based on similar properties. For example disabling all reels or shorts at once.
websiteOptions['facebook'] = [
  new Option(
    'Reels menu tab',
    true,
    'div:has(>[class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x10b6aqq x1yrsyyn x1iyjqo2"])>:nth-child(2)'
  ),
  new Option(
    'Reels tray at start of feed',
    true,
    'div[aria-label="Reels tray"]'
  ),
  new Option(
    'Reels buttons when viewing reel',
    true,
    '[role="button"]:has(div[aria-label*="Card"])'
  ),
  new Option(
    'Reels post in feed',
    true,
    'div[class="x1lliihq"]:has(div[aria-label="Reels"])'
  ),
  new Option(
    'Facebook watch menu tab',
    true,
    'ul[class="xuk3077 x78zum5 x1iyjqo2 xl56j7k x1p8ty84 x1na7pl x88anuq"]>:nth-child(2)'
  ),
  new Option(
    'Facebook watch videos on /video page',
    true,
    'div:has(>[aria-label="Video"]):has(div#watch_feed)'
  ),
  new Option(
    'Facebook watch recommendations below video',
    true,
    'div:not([class])>div[class="x78zum5"]'
  ),
  new Option(
    '"Gaming Video" menu tab',
    true,
    'ul:not([class]) li:has(a[href*="video" i])'
  ),
  new Option(
    '"Live videos" and "Watch" menu tab',
    true,
    'ul:not([class]) li:has(a[href*="watch" i])'
  ),
  new Option(
    'Sponsored posts',
    true,
    'div[class="x1lliihq"]:has(div[data-ad-rendering-role^="cta-"])'
  ),
  new Option(
    'Sponsored posts hover special case',
    true,
    'div[class="x1lliihq"]:has(a[href*="/ads/"])'
  ),
  new Option(
    'Advertisement on side',
    true,
    'div[class="x1n2onr6"]:has(a[aria-label="Advertiser"])'
  ),
];

websiteOptions['instagram'] = [
  new Option(
    'Home screen "Suggested posts" text',
    true,
    'main div:not([class])>div:has(article)>article~div>:last-child'
  ),
  new Option(
    'Home screen suggested posts',
    true,
    'main div:not([class])>div:has(article)>div~article'
  ),
  new Option(
    'Infinite loading of non-followed accounts',
    true,
    'main div._aalg'
  ),
  new Option(
    '"For you" feed button',
    true,
    'div[style="--igdstabgroup-column-count: 2;"]>:first-child'
  ),
  new Option(
    '"More posts from ..." in posts/reels',
    true,
    'main>div>div~*[class*="_aa6g"]'
  ),
  new Option('Reels menu tab', true, 'a[role="link"][href="/reels/"]'),
  new Option(
    'Reels tab on a user page',
    true,
    'a[role="tab"][href$="/reels/"]'
  ),
  new Option(
    'Reels on a user page',
    true,
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="_ac7v _al5r"])'
  ),
  new Option(
    'Explore menu tab',
    true,
    'div:not([class]):has(>span>div>a[href="/explore/"])'
  ),
  new Option(
    'Explore page posts/reels',
    true,
    'main div[style*="position: relative; display: flex; flex-direction: column;"]:has(div[class="x9f619 xjbqb8w x1lliihq x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"])'
  ),
];

websiteOptions['youtube'] = [
  new Option(
    'Shorts side menu (mini mode)',
    true,
    'ytd-mini-guide-entry-renderer[aria-label="Shorts"]'
  ),
  new Option(
    'Shorts side menu (large mode)',
    true,
    'ytd-guide-entry-renderer:has([title="Shorts"])'
  ),
  new Option(
    'Shorts on recommended page',
    true,
    'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])'
  ),
  new Option(
    'Shorts in subscriptions (small videos in grid)',
    true,
    'ytd-grid-video-renderer:has([overlay-style="SHORTS"])'
  ),
  new Option(
    'Shorts in subscriptions (large videos in grid)',
    true,
    'ytd-rich-item-renderer:has([overlay-style="SHORTS"])'
  ),
  new Option(
    'Shorts section in search results',
    true,
    'ytd-reel-shelf-renderer'
  ),
  new Option(
    'Shorts section in search results (based on aria-label)',
    true,
    'ytd-video-renderer:has([aria-label*="#shorts"i])'
  ),
  new Option(
    'Shorts section in search results (based on the "shorts" logo over thumbnail)',
    true,
    'ytd-video-renderer:has([overlay-style="SHORTS"])'
  ),
  new Option(
    'Prevent scrolling in a short video',
    true,
    'ytd-reel-video-renderer[id]:not([id="0"])'
  ),
];

websiteOptions['tiktok'] = [
  new Option(
    'Only showing one post on recommended page',
    true,
    '[data-e2e="recommend-list-item-container"]~[data-e2e="recommend-list-item-container"]'
  ),
  new Option(
    'Remove loading symbol on recommended page',
    true,
    'svg[class*="tiktok-qmnyxf-SvgContainer"]'
  ),
];

// Convert the option array to a string, for use as a CSS selector
/**
 * Converts an array of options to a string, where each option is a CSS selector.
 *
 * @param optionArray The array of options to convert
 * @returns A string of CSS selectors
 */
const stringifyOptions = (optionArray: Option[]): string => {
  return optionArray
    .filter((option) => option.active)
    .map((option) => option.selector)
    .join(',\n');
};

/**
 * Adds the CSS to the page to hide the elements specified by the options. Uses JQuery to prepend a style element to the HTML.
 *
 * @param options The array of options to hide
 */
export const addCSS = (options: Option[]) => {
  $('html').prepend(
    `<style>
        ${stringifyOptions(options)} {
            display: none!important;
        }
        </style>`
  );
};
