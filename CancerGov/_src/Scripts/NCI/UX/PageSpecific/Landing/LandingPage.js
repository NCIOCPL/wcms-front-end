import './LandingPage.scss';
import Carousel from 'Modules/carousel/carousel';
import FloatingDelighter from 'Modules/floatingDelighter';

const onDOMContentLoaded = () => {
	Carousel();
	FloatingDelighter();
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);