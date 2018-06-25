import initializeR4R from 'r4r-app';
import 'r4r-app/build/static/css/main.css';
import initializeCancerGov from './config';

const onDOMContentLoaded = () => {
    initializeCancerGov(initializeR4R);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);