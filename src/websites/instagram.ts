import { addCSS } from './options';
import { getStoredOptions } from '../utils/utils';

getStoredOptions('instagram').then(options => {
    addCSS(options);
}).catch(error => {
    console.error(error);
});