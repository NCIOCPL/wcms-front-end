import { getNodeArray } from 'Utilities/domManipulation'
import './index.scss'
import {lang} from 'Modules/NCI.config'


/**
 * Given an HTML lang code and an object with translations of a text, return the appropriate
 * string translation.
 * NOTE: ONly support English and Spanish, all other cases or no specified language on document head
 * will return English.
 * @param {string} lang 
 * @param {object} translations 
 * @returns {string}
 */
const setLanguage = (lang = 'en', translations) => {
    const language = lang === 'es' ? 'es' : 'en';
    const translatedText = translations[language];
    return translatedText;
}

const dropdownInjector = () => {
    const allHooks = getNodeArray('.cthp-card-container .cardBody .more-info');
    const filteredHooks = allHooks.filter((container, idx) => {
        const list = container.querySelector('ul');
        const links = list.children;
        if(links.length > 1) {
            const title = container.querySelector('h5'); // To be used for replaceChild
            container.classList.add('cthp-dropdown'); // Inserting the primary CSS container class hook
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `checkbox_toggle${idx}`;
            
            const label = document.createElement('label');
            label.htmlFor = `checkbox_toggle${idx}`;
            label.tabIndex = '0';

            // Collapse dropdown on on esc key
            container.addEventListener('keydown', function(e) {
                if(e.keyCode == 27) {
                    input.checked = false;
                }
            });

            // Expand / collapse dropdown on enter key.
            label.addEventListener('keydown', function(e) {
                if(e.keyCode == 13) {
                    input.click();
                }
            });

            // Collapse dropdown when tabbing past the last link
            links[links.length - 1].addEventListener('keydown', function(e) {
                if(e.keyCode == 9) {
                    input.checked = false;
                }
            });

            // If a data-customlabel exists on the container DOM object, override the generic label.
            const customLabel = container.dataset.customlabel;
            label.innerText = customLabel 
                                    ? customLabel 
                                    : setLanguage(document.documentElement.lang, lang.CTHPDropdown_Label);

            // container.replaceChild(label, title);
            container.insertBefore(label, title);
            container.insertBefore(input, label);
            return true;
        }
    })
}

export default dropdownInjector;