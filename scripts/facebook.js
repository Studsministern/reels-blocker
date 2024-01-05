// Applied in CSSselectors.js
const selectorArray = window.facebookSelectors || [];
addCSS(selectorArray);

// Applied in removeNode, used to remove all feed posts where the following strings show up
const unwantedNodeStrings = [
    'Suggested for you',
    'Reels and short videos',
    'Follow'
]

const key = 'postsRemoved';

// Otherwise get the current value
let postsRemoved = localStorage.getItem(key);

// TODO: Some of the functionality here should probably be abstracted out into a separate file
function incrementPostsRemoved() {
    if (postsRemoved == null) {
        // First time, should set the value to 0
        if (!localStorage.hasOwnProperty(key)) {
            localStorage.setItem(key, 0);
        }
        // If there should be a value, tries to get the value again.
        else {
            postsRemoved = localStorage.getItem(key);
        }
    }
    
    if (postsRemoved != null) {
        postsRemoved++;
        localStorage.setItem(key, postsRemoved);
    }
    
    console.log(`${key}: ${postsRemoved}`);
}

// Removes a node where strings from unwantedNodeStrings are included
function removeNodeIfUnwanted(node) {
    const innerText = node.innerText;
    unwantedNodeStrings.forEach(string => {
        if(innerText.includes(string)) {
            incrementPostsRemoved();
            node.parentNode.removeChild(node);
            return;
        }
    });
}

// Function copied from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
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
waitForElm('div:not([class]):has(>[class="x1lliihq"])').then((feedNode) => {
    // Removes new nodes
    let observer = new MutationObserver(mutations => {
        for(let mutation of mutations) {
            for(let node of mutation.addedNodes) {
                removeNodeIfUnwanted(node);
            }
        }
    });
        
    observer.observe(feedNode, {
        childList: true,
        subtree: false
    });

    // Remove unwanted posts that are already loaded in
    feedNode.querySelectorAll('div>[class="x1lliihq"]').forEach(e => {
        removeNodeIfUnwanted(e);
    });
});

