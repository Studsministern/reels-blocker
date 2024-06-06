import { Option } from "../websites/options";
import { WebsiteButton, SettingsItem, setInformationText } from "./components";
import { getStoredOptions, setStoredOptions } from "../utils/utils";


let optionArray: Option[];


/*** Creating button listeners for each website ***/
const websites = ['facebook', 'instagram', 'youtube', 'tiktok'];

const websiteButtons = websites.map(website => { return new WebsiteButton(website)});

const websiteButtonContainer = document.querySelector('.website-button-container');
websiteButtons.forEach(button => {
    const buttonElement = button.generateButton();

    buttonElement.addEventListener('click', () => {
        updateSettingsList(button.getWebsiteName());
    });

    websiteButtonContainer?.appendChild(buttonElement);
});


/**
 * Replaces the settings list with new options.
 * 
 * @param website The name of the website corresponding to the new settings
 * @param newOptions The new options to replace the old ones
 */
function replaceSettingsList(website: string, newOptions: Option[]): void {
    const settingsList = document.querySelector('.settings-list');

    const items = newOptions.map((option, index) => {
        const item = new SettingsItem(option, website, index);

        return item.generateItem();
    });

    settingsList?.replaceChildren(...items);
};


/**
 * Toggles the stored value of the settings item.
 * 
 * @param item The settings item to toggle
 */
export function toggleStoredOptions(item: SettingsItem): void {
    const index = item.getIndex();
    const website = item.getWebsite();

    // Update the stored value
    optionArray[index].active = !optionArray[index].active;
    setStoredOptions(website, optionArray);
}

/**
 * Updates the settings list with the options for the given website.
 * 
 * @param website The name of the website to get the settings for
 */
function updateSettingsList(website: string): void {
    getStoredOptions(website).then((options) => {
        optionArray = options;
        replaceSettingsList(website, optionArray);
    }).catch(error => {
        setInformationText('Error: ' + error);
    });
}

// Listen for changes in the settings
chrome.storage.sync.onChanged.addListener(_ => {
    setInformationText('Settings changed, update the website to see the changes.');
});

// Setting start values
updateSettingsList(websites[0]);