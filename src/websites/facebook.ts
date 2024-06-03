import { addCSS } from './selectors';

// Applied in CSSselectors.js
const selectorArray = (window as any).facebookSelectors || [];
addCSS(selectorArray);

// Applied in removeNode, used to remove all feed posts where the following strings show up
const unwantedNodeStrings = [
    'Suggested for you',
    '· Follow',
    'Sponsored',
    'added a new photo.'
]

// Removes a node where strings from unwantedNodeStrings are included
function removeNodeIfUnwanted(node: HTMLElement) {
    // Special case for Reels and short videos
    if (node.innerText.includes('Reels and short videos')) {
        node.parentNode?.removeChild(node);
        return;
    }

    // Handling all other strings
    const headerElement = node.querySelector('.x1cy8zhl');
    const innerText = headerElement?.textContent ?? '';

    unwantedNodeStrings.forEach(string => {
        if (innerText.includes(string)) {
            node.parentNode?.removeChild(node);
            console.log('Reels blocker: Removed post with text: ' + string);
            return;
        }
    });
}

// Function copied from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector: string) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Post feed node is loaded
waitForElm('div:not([class]):has(>[class="x1lliihq"])').then((feedNode: unknown) => {
    // Removes new nodes
    let observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            const addedNodes = Array.from(mutation.addedNodes);
            for (let node of addedNodes) {
                removeNodeIfUnwanted(node as HTMLElement);
            }
        }
    });

    observer.observe(feedNode as Node, {
        childList: true,
        subtree: false
    });

    // Remove unwanted posts that are already loaded in
    (feedNode as HTMLElement).querySelectorAll('div>[class="x1lliihq"]').forEach(e => {
        removeNodeIfUnwanted(e as HTMLElement);
    });
});

