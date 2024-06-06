import { addCSS } from './options';
import { getStoredOptions } from '../utils/utils';


// Applied in removeNode, used to remove all feed posts where the following strings show up
const unwantedNodeStrings = [
    'Suggested for you',
    '· Follow',
    'Sponsored',
    'added a new photo.'
]


/**
 * Removes a node if it contains unwanted strings.
 * 
 * @param node The node to remove, if unwanted
 */
function removeNodeIfUnwanted(node: HTMLElement): void {
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

/**
 * Waits for an element to exist in the DOM, and then observes it for changes. When any changes occur, the function will remove the node if it contains unwanted strings.
 * 
 * Function copied from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
 * 
 * @param selector The CSS selector to wait for
 * @returns A promise that resolves when the element is found
 */
function waitForElm(selector: string): Promise<unknown> {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(_ => {
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

/**
 * Mutates the feed node by observing it for changes and removing unwanted posts.
 * 
 * @param feedNode The node containing the feed posts
 */
function mutateFeedNode(feedNode: HTMLElement): void {
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
}

// Add CSS after the stored options have been loaded
getStoredOptions('facebook').then((options) => {
    addCSS(options);
}).catch(error => {
    console.error(error);
});

// Mutate the feed after the node for the feed has been found
waitForElm('div:not([class]):has(>[class="x1lliihq"])').then((feedNode: unknown) => {
    mutateFeedNode(feedNode as HTMLElement);
});