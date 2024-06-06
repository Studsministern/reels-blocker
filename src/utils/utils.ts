import { Option, websiteOptions } from '../websites/options';


/**
 * Generates a key to get the stored options for a website.
 * 
 * @param website The name of the website
 * @returns The key to get the stored options
 */
export function generateWebsiteKey(website: string): string {
    return `${website}Options`;
}

/**
 * Gets the stored options for a website.
 * 
 * @param website The name of the website
 * @returns A promise of the stored options
 */
export async function getStoredOptions(website: string): Promise<Option[]> {
    return new Promise((resolve, reject) => {
        const key = generateWebsiteKey(website);
        const options = websiteOptions[website];

        // Gets the stored data for the website
        chrome.storage.sync.get([key], (data) => {
            if (data === undefined) {
                reject('Invalid key');
            }

            if (data[key] === undefined) {
                // If there wasn't data, set the default options
                setStoredOptions(website, options);
                resolve(options as Option[]);
            }

            // If there is data, return it
            resolve(data[key] as Option[]);
        });
    });
}

/**
 * Sets the stored options for a website.
 * 
 * @param website The name of the website
 * @param newOptions The new options to store
 */
export function setStoredOptions(website: string, newOptions: Option[]): void {
    const key = generateWebsiteKey(website);
    chrome.storage.sync.set({ [key]: newOptions });
}