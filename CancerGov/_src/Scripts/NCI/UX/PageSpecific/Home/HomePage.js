import 'Modules/carousel/carousel';
import espanolHome from 'Home/Enhancements/espanolHome';
import FloatingDelighter from 'Modules/floatingDelighter';
import patternInjector from 'Modules/patternInjector';
import carouselSettings from './carouselSettings';
import './HomePage.scss';


const onDOMContentLoaded = () => {
    espanolHome.init();
    FloatingDelighter();
    patternInjector(carouselSettings);
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);