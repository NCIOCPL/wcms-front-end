import {
    getDelighterSettings,
    buildDelighter,
} from './utilities';
import basePaths from './basePaths';
import './index.scss';

let isInitialized = false;

const init = () => {
    if(isInitialized) {
        return;
    }
    else {
        isInitialized = true;
    }

    const pathName = location.pathname.toLowerCase();
    const delighterSettings = getDelighterSettings(pathName, basePaths);

    if(delighterSettings) {
        const delighterElement = buildDelighter(delighterSettings);
        const delighterParent = document.querySelector('.page-options-container');

        // Just in case this ends up running on a page without the container (it shouldn't)
        if(delighterParent) {
            delighterParent.appendChild(delighterElement);
        }

        // This allows us to add more custom CSS rules to siblings when delighter isn't present
        // At the moment it is not being used so I'm leaving it here just in case.
        // delighterParent.classList.append('floating-delighter--active');

        return delighterElement;
    }
}

export default init;