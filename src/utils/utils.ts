import { Option, websiteOptions } from '../websites/options';

/**
 * Generates a key to get the stored options for a website.
 *
 * @param website The name of the website
 * @returns The key to get the stored options
 */
export const generateWebsiteKey = (website: string): string => {
  return `${website}Options`;
};

/**
 * Creates updated options based on the default options and the stored options.
 *
 * @param defaultOptions The default options
 * @param storedOptions The stored options
 * @returns The updated options
 */
const createUpdatedOptions = (
  defaultOptions: Option[],
  storedOptions: Option[]
): Option[] => {
  return defaultOptions.map((option: Option) => {
    // Find the option in the stored data
    const storedOption = storedOptions.find(
      (storedOption: Option) =>
        storedOption.description === option.description ||
        storedOption.selector === option.selector
    );

    // If the option wasn't found, return the default option
    if (storedOption === undefined) return option;

    // If the option was found and both the description and selector is the same,
    // return the stored option (which contains the correct active value)
    if (
      storedOption.description === option.description &&
      storedOption.selector === option.selector
    )
      return storedOption;

    // If the option was found, but either the selector or description differs, update the option but with the stored active value
    return new Option(option.description, storedOption.active, option.selector);
  });
};

/**
 * Gets the stored options for a website.
 *
 * @param website The name of the website
 * @returns A promise of the stored options
 */
export const getStoredOptions = async (website: string): Promise<Option[]> => {
  return new Promise((resolve, _) => {
    const key = generateWebsiteKey(website);
    const defaultOptions = websiteOptions[website];

    // Gets the stored data for the website
    chrome.storage.sync.get([key], (data) => {
      if (data === undefined) {
        throw new Error('Invalid key: ' + key);
      }

      // If there wasn't stored data, set the default options
      const storedOptions = data[key];
      if (storedOptions === undefined) {
        setStoredOptions(website, defaultOptions);
        resolve(defaultOptions);
      }

      // If the stored options differ from the updated options, set new stored options
      const updatedOptions = createUpdatedOptions(
        defaultOptions,
        storedOptions
      );
      if (JSON.stringify(storedOptions) !== JSON.stringify(updatedOptions))
        setStoredOptions(website, updatedOptions);

      // Return the options
      resolve(updatedOptions);
    });
  });
};

/**
 * Sets the stored options for a website.
 *
 * @param website The name of the website
 * @param newOptions The new options to store
 */
export const setStoredOptions = (
  website: string,
  newOptions: Option[]
): void => {
  const key = generateWebsiteKey(website);
  chrome.storage.sync.set({ [key]: newOptions });
};

/**
 * Throw an error from this web extension.
 *
 * @param message The error message
 * @throws An error with the message
 */
export const throwError = (message: string): void => {
  throw new Error(`Reels blocker: ${message}`);
};
