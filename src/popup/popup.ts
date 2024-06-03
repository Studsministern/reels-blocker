import { Option, facebookOptions } from "../websites/options";
import { changeTestText } from "./test";

let optionArray: Option[];


// Interaction with the popup
chrome.storage.sync.onChanged.addListener(changes => {
    changeTestText('Storage changed: ' + JSON.stringify(changes));
});

function toggleoption(index: number) {
    optionArray[index].active = !optionArray[index].active;
    chrome.storage.sync.set({ facebookOptions: optionArray });
}


// Initial loading of the popup
chrome.storage.sync.get('facebookOptions', (data) => {
    if (data.facebookOptions === undefined) {
        chrome.storage.sync.set({ facebookOptions: facebookOptions});
        optionArray = facebookOptions;
    } else {
        optionArray = data.facebookOptions as Option[];
    }

    addOptionsToDocument(optionArray);
});

function addOptionsToDocument(options: Option[]) {
    const settingsList = document.querySelector('.settings-list');

    options.forEach((option, index) => {
        const settingsItem = document.createElement('div');
        settingsItem.className = 'settings-item';

        const toggle = document.createElement('label');
        toggle.className = 'toggle';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = option.active;
        input.addEventListener('change', () => toggleoption(index));
        
        const span = document.createElement('span');
        span.classList.add('slider', 'round');

        const text = document.createElement('p');
        text.textContent = option.description;
        
        settingsList?.appendChild(settingsItem);
        settingsItem.appendChild(toggle);
        toggle.appendChild(input);
        toggle.appendChild(span);
        settingsItem.appendChild(text);
    });
};
