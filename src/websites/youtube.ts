import { Option, addCSS } from './options';
import { getStoredOptions } from '../utils/utils';

// TODO: Should be editable in the popup
const DEFAULT_HOME_PAGE_SECTIONS = 3;

let options: Option[] = [];

/**
 * Sets the number of sections of the home page that should be visible.
 *
 * @param sections The number of sections of the home page that should be visible
 */
const setHomePageSections = (sections: number): void => {
  if (sections >= 0) {
    // Only affects the home page because of [page-subtype="home"]. Alternatives are [page-subtype="channel"] and [page-subtype="subscriptions"]
    options.push(
      new Option(
        'Limit home page sections',
        true,
        `ytd-two-column-browse-results-renderer[page-subtype="home"] #contents:has(ytd-rich-grid-row)>:nth-child(n + ${
          sections + 1
        })`
      )
    );
  }
};

getStoredOptions('youtube')
  .then((options) => {
    setHomePageSections(DEFAULT_HOME_PAGE_SECTIONS);
    addCSS(options);
  })
  .catch((error) => {
    console.error(error);
  });
