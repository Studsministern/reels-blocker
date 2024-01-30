const selectorArray = window.youtubeSelectors;

// Number of sections in the home video page that shows up. Allowed to be positive numbers.
// Only affects the home page because of [page-subtype="home"]. Alternatives are [page-subtype="channel"] and [page-subtype="subscriptions"]
// TODO: Should be set as an option
const homePageSections = 3;

if (homePageSections >= 0) {
    selectorArray.push(
        `ytd-two-column-browse-results-renderer[page-subtype="home"] #contents:has(ytd-rich-grid-row)>:nth-child(n + ${homePageSections + 1})`
    );
}

addCSS(selectorArray);