import dropdownInjector from 'Modules/cthpDropdown';
import patternInjector from 'Modules/patternInjector';
import accordionSettings from './accordionSettings';
import './CTHPPage.scss';

const onDOMContentLoaded = () => {
    dropdownInjector();
    patternInjector(accordionSettings);
}

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
