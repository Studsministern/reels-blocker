import { Option } from '../websites/options';
import { toggleStoredOptions } from './popup';

const informationParagraph = document.querySelector('.information');

/**
 * Sets the text of the information paragraph.
 * 
 * @param text The text to change to
 */
export const setInformationText = (text: string): void => {
    if (informationParagraph === null) {
        return;
    }

    informationParagraph.textContent = text;
}

/**
 * A class for a button component that has an icon for a website.
 * 
 * @param websiteName The name of the website
 */
export class WebsiteButton {
    private websiteName: string;

    constructor(websiteName: string) {
        this.websiteName = websiteName;
    }

    /**
     * @returns The name of the website
     */
    getWebsiteName = (): string => {
        return this.websiteName;
    }

    /**
     * @returns The HTML for the button
     */
    generateButton = (): HTMLButtonElement => {
        const button = document.createElement('button');
        button.classList.add(`${this.websiteName}-button`);
        
        const img = document.createElement('img');
        img.src = `/icons/websites/${this.websiteName}.png`;
        img.alt = `${this.websiteName} settings`;
        
        button.appendChild(img);
        
        return button;
    }
}

/**
 * A class for a settings item component that has a toggle and a description.
 * 
 * @param option The option object to create the item from
 * @param website The name of the website that the option belongs to
 * @param index The index of the option in the array
 */
export class SettingsItem {
    private option: Option;
    private website: string;
    private index: number;

    constructor(option: Option, website: string, index: number) {
        this.option = option;
        this.website = website;
        this.index = index;
    }

    /**
     * @returns The website name
     */
    getWebsite = (): string => {
        return this.website;
    }

    /**
     * @returns The index of the option in the array
     */
    getIndex = (): number => {
        return this.index;
    }

    /**
     * @returns The HTML for the item, with an event listener for toggling the item
     */
    generateItem = (): HTMLDivElement => {
        const settingsItem = document.createElement('div');
        settingsItem.className = 'settings-item';

        const toggle = document.createElement('label');
        toggle.className = 'toggle';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = this.option.active;
        input.addEventListener('change', () => toggleStoredOptions(this) );
        
        const span = document.createElement('span');
        span.classList.add('slider', 'round');

        const text = document.createElement('p');
        text.textContent = this.option.description;
        
        settingsItem.appendChild(toggle);
        toggle.appendChild(input);
        toggle.appendChild(span);
        settingsItem.appendChild(text);
        return settingsItem;
    }
}