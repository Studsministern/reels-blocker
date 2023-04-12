/** CSS selectors in selectorArray to get rid of Tiktoks: 
 * 0: Recommended page only showing one post
 * 1: Removing loading symbol on recommended page 
 */ 

// Applied in CSSselectors.js
const selectorArray = [
    '[data-e2e="recommend-list-item-container"]~[data-e2e="recommend-list-item-container"]',
    'svg[class*="tiktok-qmnyxf-SvgContainer"]'
];