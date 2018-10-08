import 'PDQ/pdqcis';
import Patch from 'Patches/Hotfixes/WCMSFEQ-243';
import * as cisPrint from 'PDQ/Enhancements/cisPrint';
import './PDQPage.scss';

const onDOMContentLoaded = () => {
    cisPrint.init();
    Patch();
};

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);