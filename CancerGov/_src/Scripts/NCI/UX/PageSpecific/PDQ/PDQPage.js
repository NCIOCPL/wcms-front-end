import 'PDQ/pdqcis';
import Patch from 'Patches/Hotfixes/WCMSFEQ-243';
import cisPrint from 'PDQ/Enhancements/cisPrint';
import './PDQPage.scss';

const onDOMContentLoaded = () => {
    cisPrint();
    Patch();
};

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);