import { Selector } from "../websites/selectors.js";

const selectorArray: Selector[] = (window as any).facebookSelectors || [];

function toggleSelector(index: number) {
    selectorArray[index].active = !selectorArray[index].active;

    // Update the CSS or do other necessary actions here...
}

function addSelectorsToDocument(selectors: Selector[]) {
    const settingsList = document.querySelector('.settings-list');

    selectors.forEach((selector, index) => {
        const settingsItem = document.createElement('div');
        settingsItem.className = 'settings-item';

        const toggle = document.createElement('label');
        toggle.className = 'toggle';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = selector.active;
        input.addEventListener('change', () => toggleSelector(index));
        
        const span = document.createElement('span');
        span.classList.add('slider', 'round');

        const text = document.createElement('p');
        text.textContent = selector.description;
        
        settingsList?.appendChild(settingsItem);
        settingsItem.appendChild(toggle);
        toggle.appendChild(input);
        toggle.appendChild(span);
        settingsItem.appendChild(text);
    });
};

addSelectorsToDocument(selectorArray);