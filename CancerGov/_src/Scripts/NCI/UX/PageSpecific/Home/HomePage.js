import 'Modules/carousel/carousel';
import espanolHome from 'Home/Enhancements/espanolHome';
import CTDelighter from 'Common/Enhancements/clinicalTrialsDelighter';
import patternInjector from 'Modules/patternInjector';
import carouselSettings from './carouselSettings';
import './HomePage.scss';


const onDOMContentLoaded = () => {
    espanolHome.init();
    CTDelighter.init();
    patternInjector(carouselSettings);
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);