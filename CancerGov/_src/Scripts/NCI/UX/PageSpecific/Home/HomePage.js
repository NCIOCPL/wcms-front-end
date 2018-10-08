import Carousel from 'Modules/carousel/carousel';
import FloatingDelighter from 'Modules/floatingDelighter';
import patternInjector from 'Modules/patternInjector';
import carouselSettings from './carouselSettings';
import './HomePage.scss';


const onDOMContentLoaded = () => {
    if(location.pathname.match('espanol')){
        document.querySelector('.ncilandingpage').classList.add('espanol-home');
    }
    Carousel();
    FloatingDelighter();
    patternInjector(carouselSettings);
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);