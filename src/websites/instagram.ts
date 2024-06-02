import { addCSS } from './selectors';

const selectorArray = (window as any).instagramSelectors || [];
addCSS(selectorArray);