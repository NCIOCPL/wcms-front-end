import r4r from 'r4r-app';
import 'r4r-app/build/static/css/main.css';
import initializeCancerGov from './custom_configs/cancerGov'

const onDOMContentLoaded = () => {
    initializeCancerGov(r4r);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);