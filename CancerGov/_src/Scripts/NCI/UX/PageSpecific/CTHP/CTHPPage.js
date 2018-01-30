import patternInjector from 'Modules/patternInjector';
import accordionSettings from './accordionSettings';
import './CTHPPage.scss';

const onDOMContentLoaded = () => patternInjector(accordionSettings);

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
